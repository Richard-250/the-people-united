import { NextResponse } from "next/server";
import { appendBooking } from "@/lib/submission-store";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object")
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const { courseName, coursePrice, payerName: rawName, payerPhone: rawPhone } =
    body as Record<string, unknown>;

  if (typeof courseName !== "string" || !courseName.trim())
    return NextResponse.json({ error: "Course required" }, { status: 400 });
  if (typeof coursePrice !== "string" || !coursePrice.trim())
    return NextResponse.json({ error: "Price required" }, { status: 400 });
  const payerName = typeof rawName === "string" ? rawName : "";
  const payerPhone = typeof rawPhone === "string" ? rawPhone : "";

  try {
    appendBooking({
      courseName: courseName.trim().slice(0, 200),
      coursePrice: coursePrice.trim().slice(0, 80),
      payerName: payerName.trim().slice(0, 200),
      payerPhone: payerPhone.trim().slice(0, 80),
    });
  } catch (e) {
    console.error("[booking]", e);
    return NextResponse.json({ error: "Could not save booking" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
