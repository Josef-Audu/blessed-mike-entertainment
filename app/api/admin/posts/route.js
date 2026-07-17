import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  inspectMediaFile,
  isAllowedOrigin,
  MAX_MEDIA_BYTES,
  validatePost,
} from "@/lib/security";
import { createServiceClient, getAdminUser } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authError(result) {
  return NextResponse.json(
    { error: result.error === "FORBIDDEN" ? "Forbidden." : "Authentication required." },
    { status: result.error === "FORBIDDEN" ? 403 : 401 },
  );
}

export async function GET(request) {
  try {
    const admin = await getAdminUser(request);
    if (!admin.user) return authError(admin);

    const { data, error } = await createServiceClient()
      .from("posts")
      .select("id,title,slug,category,content,image_url,likes,created_at,time_ago")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;

    return NextResponse.json({ posts: data || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Admin post list error", error);
    return NextResponse.json({ error: "Unable to load posts." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  try {
    const admin = await getAdminUser(request);
    if (!admin.user) return authError(admin);

    const declaredLength = Number(request.headers.get("content-length") || 0);
    if (declaredLength > MAX_MEDIA_BYTES + 100_000) {
      return NextResponse.json({ error: "Upload is too large." }, { status: 413 });
    }

    const service = createServiceClient();
    const allowed = await consumeRateLimit(service, `admin-post:${admin.user.id}`, 20, 60);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const form = await request.formData();
    const validated = validatePost({
      title: form.get("title"),
      slug: form.get("slug"),
      category: form.get("category"),
      content: form.get("content"),
    });
    if (validated.error) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const file = form.get("media");
    let storagePath = null;
    let imageUrl = null;
    if (file && typeof file !== "string" && file.size > 0) {
      const inspected = await inspectMediaFile(file);
      if (inspected.error) {
        return NextResponse.json({ error: inspected.error }, { status: 400 });
      }

      storagePath = `${randomUUID()}.${inspected.extension}`;
      const { error: uploadError } = await service.storage.from("media").upload(
        storagePath,
        inspected.buffer,
        { contentType: inspected.contentType, cacheControl: "3600", upsert: false },
      );
      if (uploadError) throw uploadError;
      imageUrl = service.storage.from("media").getPublicUrl(storagePath).data.publicUrl;
    }

    const { data, error } = await service
      .from("posts")
      .insert({ ...validated.data, image_url: imageUrl })
      .select("id,title,slug,category,content,image_url,likes,created_at,time_ago")
      .single();

    if (error) {
      if (storagePath) await service.storage.from("media").remove([storagePath]);
      throw error;
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error) {
    console.error("Admin post creation error", error);
    return NextResponse.json({ error: "Unable to create the post." }, { status: 500 });
  }
}
