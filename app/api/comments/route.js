import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  getClientFingerprint,
  isAllowedOrigin,
  readJson,
  validateComment,
} from "@/lib/security";
import { createServiceClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  try {
    const body = await readJson(request);
    const validated = validateComment(body);
    if (validated.honeypot) return NextResponse.json({ accepted: true }, { status: 202 });
    if (validated.error) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const service = createServiceClient();
    const fingerprint = getClientFingerprint(request);
    const allowed = await consumeRateLimit(service, `comment:${fingerprint}`, 5, 60);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many comments. Try again shortly." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const { data: post, error: postError } = await service
      .from("posts")
      .select("slug")
      .eq("slug", validated.data.postSlug)
      .maybeSingle();
    if (postError) throw postError;
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const { data, error } = await service
      .from("comments")
      .insert({
        post_slug: validated.data.postSlug,
        username: validated.data.username,
        comment_text: validated.data.commentText,
      })
      .select("id,post_slug,username,comment_text,created_at")
      .single();
    if (error) throw error;

    return NextResponse.json({ comment: data }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError || error.message === "PAYLOAD_TOO_LARGE") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    console.error("Comment creation error", error);
    return NextResponse.json({ error: "Unable to post the comment." }, { status: 500 });
  }
}
