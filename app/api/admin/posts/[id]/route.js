import { NextResponse } from "next/server";
import { consumeRateLimit, isAllowedOrigin } from "@/lib/security";
import { createServiceClient, getAdminUser } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function DELETE(request, context) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  try {
    const admin = await getAdminUser(request);
    if (!admin.user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const { id } = await context.params;
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) {
      return NextResponse.json({ error: "Invalid post." }, { status: 400 });
    }

    const service = createServiceClient();
    const allowed = await consumeRateLimit(service, `admin-delete:${admin.user.id}`, 10, 60);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const { data, error } = await service.rpc("delete_post_and_comments", { p_post_id: id });
    if (error) throw error;
    if (!data?.deleted) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    if (data.storage_path) {
      const { error: storageError } = await service.storage.from("media").remove([data.storage_path]);
      if (storageError) console.error("Orphaned media cleanup failed", storageError);
    }

    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Admin post deletion error", error);
    return NextResponse.json({ error: "Unable to delete the post." }, { status: 500 });
  }
}
