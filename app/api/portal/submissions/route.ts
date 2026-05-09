import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyPortalToken } from "@/lib/portal-auth";
import { getAllSubmissions } from "@/lib/submission-store";

export async function GET() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!verifyPortalToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllSubmissions());
}
