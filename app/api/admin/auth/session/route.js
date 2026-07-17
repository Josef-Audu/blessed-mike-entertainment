import { NextResponse } from "next/server";
import {
  createAnonServerClient,
  getAdminUser,
  getRefreshToken,
  setSessionCookies,
  clearSessionCookies,
} from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const current = await getAdminUser(request);
    if (current.user) {
      return NextResponse.json(
        { authenticated: true, email: current.user.email },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const refreshToken = getRefreshToken(request);
    if (!refreshToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const auth = createAnonServerClient();
    const { data, error } = await auth.auth.refreshSession({ refresh_token: refreshToken });
    if (error || !data.session || data.user?.app_metadata?.role !== "admin") {
      const response = NextResponse.json({ authenticated: false }, { status: 401 });
      clearSessionCookies(response);
      return response;
    }

    const response = NextResponse.json(
      { authenticated: true, email: data.user.email },
      { headers: { "Cache-Control": "no-store" } },
    );
    setSessionCookies(response, data.session);
    return response;
  } catch (error) {
    console.error("Admin session error", error);
    return NextResponse.json({ authenticated: false }, { status: 503 });
  }
}
