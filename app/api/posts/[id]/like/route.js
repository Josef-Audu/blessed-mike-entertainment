import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  getClientFingerprint,
  isAllowedOrigin,
} from "@/lib/security";
import { createServiceClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request, context) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  try {
    const { id } = await context.params;
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) {
      return NextResponse.json({ error: "Invalid post." }, { status: 400 });
    }

    const service = createServiceClient();
    const fingerprint = getClientFingerprint(request);
    const allowed = await consumeRateLimit(service, `like:${fingerprint}:${id}`, 3, 3600);
    if (!allowed) {
      return NextResponse.json(
        { error: "You have already liked this post." },
        { status: 429, headers: { "Retry-After": "3600" } },
      );
    }

    const { data, error } = await service.rpc("increment_post_likes", { p_post_id: id });
    if (error) throw error;
    if (data === null) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ likes: data });
  } catch (error) {
    console.error("Post like error", error);
    return NextResponse.json({ error: "Unable to register the like." }, { status: 500 });
  }
}
