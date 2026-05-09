import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "tpc_owner";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function secret(): string {
  return (
    process.env.PORTAL_SESSION_SECRET ||
    process.env.PORTAL_PASSWORD ||
    ""
  );
}

export function createPortalToken(): string | null {
  const s = secret();
  if (!s) return null;
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payloadB64 = Buffer.from(JSON.stringify({ exp }), "utf-8").toString(
    "base64url",
  );
  const sig = createHmac("sha256", s).update(payloadB64).digest("hex");
  return `${payloadB64}.${sig}`;
}

export function verifyPortalToken(token: string | undefined): boolean {
  if (!token?.includes(".")) return false;
  const s = secret();
  if (!s) return false;
  const dot = token.lastIndexOf(".");
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", s).update(payloadB64).digest("hex");
  if (expected.length !== sig.length) return false;
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return false;
  } catch {
    return false;
  }
  try {
    const { exp } = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8"),
    ) as { exp: number };
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}

export function checkPortalPassword(pw: string): boolean {
  const expected = process.env.PORTAL_PASSWORD;
  if (!expected || typeof pw !== "string") return false;
  const a = Buffer.from(pw, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export { COOKIE_NAME, MAX_AGE_SEC };
