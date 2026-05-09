import { NextResponse } from "next/server";
import {
  checkPortalPassword,
  COOKIE_NAME,
  createPortalToken,
  MAX_AGE_SEC,
} from "@/lib/portal-auth";

export async function POST(req: Request) {
  if (!process.env.PORTAL_PASSWORD) {
    return NextResponse.json(
      { error: "Owner portal is not configured (set PORTAL_PASSWORD)." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!checkPortalPassword(String(body.password ?? ""))) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createPortalToken();
  if (!token) {
    return NextResponse.json(
      { error: "Could not create session" },
      { status: 500 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
    path: "/",
  });
  return res;
}
