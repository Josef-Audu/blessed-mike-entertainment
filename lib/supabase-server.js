import { createClient } from "@supabase/supabase-js";

const ACCESS_COOKIE = "bme_admin_access";
const REFRESH_COOKIE = "bme_admin_refresh";

function requireEnvironment(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}

const serverAuthOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

export function createAnonServerClient() {
  return createClient(
    requireEnvironment("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnvironment("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    serverAuthOptions,
  );
}

export function createServiceClient() {
  return createClient(
    requireEnvironment("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnvironment("SUPABASE_SERVICE_ROLE_KEY"),
    serverAuthOptions,
  );
}

export async function getAdminUser(request) {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return { error: "UNAUTHENTICATED" };

  const client = createAnonServerClient();
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return { error: "UNAUTHENTICATED" };
  if (data.user.app_metadata?.role !== "admin") return { error: "FORBIDDEN" };
  return { user: data.user, token };
}

export function setSessionCookies(response, session) {
  const secure = process.env.NODE_ENV === "production";
  const shared = { httpOnly: true, secure, sameSite: "strict", path: "/" };
  response.cookies.set(ACCESS_COOKIE, session.access_token, {
    ...shared,
    maxAge: Math.max(60, session.expires_in || 3600),
  });
  response.cookies.set(REFRESH_COOKIE, session.refresh_token, {
    ...shared,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSessionCookies(response) {
  const secure = process.env.NODE_ENV === "production";
  const shared = { httpOnly: true, secure, sameSite: "strict", path: "/", maxAge: 0 };
  response.cookies.set(ACCESS_COOKIE, "", shared);
  response.cookies.set(REFRESH_COOKIE, "", shared);
}

export function getRefreshToken(request) {
  return request.cookies.get(REFRESH_COOKIE)?.value || null;
}

export function getAccessToken(request) {
  return request.cookies.get(ACCESS_COOKIE)?.value || null;
}
