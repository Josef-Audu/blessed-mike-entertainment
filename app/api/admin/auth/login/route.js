import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  getClientFingerprint,
  isAllowedOrigin,
  readJson,
  validateEmail,
} from "@/lib/security";
import {
  createAnonServerClient,
  createServiceClient,
  setSessionCookies,
} from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  try {
    const body = await readJson(request, 4_000);
    const email = validateEmail(body?.email);
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
    }

    const service = createServiceClient();
    const fingerprint = getClientFingerprint(request);
    const allowed = await consumeRateLimit(service, `admin-login:${fingerprint}`, 5, 900);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }

    const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count, error: countError } = await service
      .from("admin_login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("identifier", email)
      .eq("success", false)
      .gte("created_at", cutoff);
    if (countError) throw countError;
    if ((count || 0) >= 5) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }

    const auth = createAnonServerClient();
    const { data, error } = await auth.auth.signInWithPassword({ email, password });
    const isAdmin = data.user?.app_metadata?.role === "admin";

    const { error: logError } = await service.from("admin_login_attempts").insert({
      identifier: email,
      success: Boolean(!error && isAdmin),
      ip_hash: fingerprint,
      user_agent: (request.headers.get("user-agent") || "unknown").slice(0, 500),
    });
    if (logError) console.error("Failed to record admin login attempt", logError);

    if (error || !data.session || !isAdmin) {
      if (data.session) await auth.auth.signOut();
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ authenticated: true });
    setSessionCookies(response, data.session);
    return response;
  } catch (error) {
    if (error instanceof SyntaxError || error.message === "PAYLOAD_TOO_LARGE") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    console.error("Admin login error", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
