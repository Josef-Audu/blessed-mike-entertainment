import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/security";
import {
  clearSessionCookies,
  createServiceClient,
  getAccessToken,
} from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  const accessToken = getAccessToken(request);
  if (accessToken) {
    try {
      await createServiceClient().auth.admin.signOut(accessToken, "global");
    } catch (error) {
      console.error("Failed to revoke admin session", error);
    }
  }

  const response = NextResponse.json({ authenticated: false });
  clearSessionCookies(response);
  return response;
}
