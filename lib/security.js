import { createHash } from "node:crypto";

export const CATEGORIES = new Set([
  "sports",
  "music",
  "entertainment",
  "pop-culture",
]);

export const MAX_MEDIA_BYTES = 25 * 1024 * 1024;

export function cleanText(value) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
    : "";
}

export function validateEmail(value) {
  const email = cleanText(value).toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }
  return email;
}

export function validateComment(input) {
  const username = cleanText(input?.username) || "Anonymous User";
  const commentText = cleanText(input?.commentText);
  const postSlug = cleanText(input?.postSlug).toLowerCase();
  const website = cleanText(input?.website);

  if (website) return { honeypot: true };
  if (username.length > 80) return { error: "Name must be 80 characters or fewer." };
  if (commentText.length < 2 || commentText.length > 2000) {
    return { error: "Comment must be between 2 and 2,000 characters." };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(postSlug) || postSlug.length > 160) {
    return { error: "Invalid post." };
  }

  return { data: { username, commentText, postSlug } };
}

export function validatePost(input) {
  const title = cleanText(input?.title);
  const slug = cleanText(input?.slug).toLowerCase();
  const category = cleanText(input?.category).toLowerCase();
  const content = cleanText(input?.content);

  if (title.length < 3 || title.length > 180) {
    return { error: "Title must be between 3 and 180 characters." };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 160) {
    return { error: "Slug must contain only lowercase letters, numbers, and hyphens." };
  }
  if (!CATEGORIES.has(category)) return { error: "Invalid category." };
  if (content.length < 10 || content.length > 30000) {
    return { error: "Content must be between 10 and 30,000 characters." };
  }

  return { data: { title: title.toUpperCase(), slug, category, content } };
}

export function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const allowed = new Set([new URL(request.url).origin]);
  for (const configuredOrigin of (process.env.ALLOWED_ORIGINS || "").split(",")) {
    const normalized = configuredOrigin.trim();
    if (normalized) allowed.add(normalized);
  }
  return allowed.has(origin);
}

export function getClientFingerprint(request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function readJson(request, maxBytes = 12_000) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > maxBytes) throw new Error("PAYLOAD_TOO_LARGE");

  const reader = request.body?.getReader();
  if (!reader) return {};

  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new Error("PAYLOAD_TOO_LARGE");
    }
    chunks.push(value);
  }

  const combined = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(combined));
}

export async function consumeRateLimit(client, key, limit, windowSeconds) {
  const { data, error } = await client.rpc("consume_rate_limit", {
    p_key: key,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  if (error) throw error;
  return data === true;
}

export async function inspectMediaFile(file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return { error: "Select a valid media file." };
  }
  if (file.size > MAX_MEDIA_BYTES) {
    return { error: "Media must be 25 MB or smaller." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const isJpeg = buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  const isPng = buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isWebp = buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  const isWebm = buffer.length >= 4 && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]));
  const isIsoVideo = buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp";

  if (isJpeg && ["image/jpeg", "image/jpg"].includes(file.type)) return { buffer, contentType: "image/jpeg", extension: "jpg" };
  if (isPng && file.type === "image/png") return { buffer, contentType: "image/png", extension: "png" };
  if (isWebp && file.type === "image/webp") return { buffer, contentType: "image/webp", extension: "webp" };
  if (isWebm && file.type === "video/webm") return { buffer, contentType: "video/webm", extension: "webm" };
  if (isIsoVideo && ["video/mp4", "video/quicktime"].includes(file.type)) {
    return { buffer, contentType: file.type, extension: file.type === "video/quicktime" ? "mov" : "mp4" };
  }

  return { error: "The file content does not match an allowed image or video type." };
}
