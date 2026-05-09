import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendContact } from "@/lib/submission-store";

const MAX_LEN = 8000;

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body");
  }

  if (!body || typeof body !== "object") return bad("Invalid payload");

  const { name, email, phone, service, message } = body as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || !name.trim())
    return bad("Name is required.");
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return bad("Valid email is required.");
  if (typeof phone !== "string" || !phone.trim())
    return bad("Phone is required.");
  if (typeof service !== "string" || !service.trim())
    return bad("Service is required.");
  if (typeof message !== "string" || !message.trim())
    return bad("Message is required.");

  const safeName = name.trim().slice(0, 200);
  const safeEmail = email.trim().slice(0, 320);
  const safePhone = phone.trim().slice(0, 80);
  const safeService = service.trim().slice(0, 200);
  const safeMessage = message.trim().slice(0, MAX_LEN);

  const inbox =
    process.env.CONTACT_INBOX_EMAIL || "thepeopleunitedltd@gmail.com";

  let emailed = false;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE !== "false";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromAddr =
      process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || inbox;

    const text = [
      `New message from the website contact form`,
      ``,
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      `Phone: ${safePhone}`,
      `Service: ${safeService}`,
      ``,
      safeMessage,
    ].join("\n");

    const html = `
    <h2>Website contact</h2>
    <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a></p>
    <p><strong>Phone:</strong> ${escapeHtml(safePhone)}</p>
    <p><strong>Service:</strong> ${escapeHtml(safeService)}</p>
    <hr />
    <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;">${escapeHtml(safeMessage)}</pre>
  `;

    try {
      await transporter.sendMail({
        from: `"tTHE PEOPLE CONSTRUCTION website" <${fromAddr}>`,
        to: inbox,
        replyTo: safeEmail,
        subject: `[Website] ${safeService} — ${safeName}`,
        text,
        html,
      });
      emailed = true;
    } catch (e) {
      console.error("[contact] smtp", e);
    }
  }

  try {
    appendContact({
      name: safeName,
      email: safeEmail,
      phone: safePhone,
      service: safeService,
      message: safeMessage,
      emailed,
    });
  } catch (e) {
    console.error("[contact] store", e);
    return NextResponse.json(
      { error: "Could not save your message. Please try again or call us." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, emailed });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
