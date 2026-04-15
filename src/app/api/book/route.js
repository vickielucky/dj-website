import { Resend } from "resend";
import validator from "validator";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitStore = new Map();

function getClientIp(req) {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request content type." }),
        { status: 415 }
      );
    }

    const ip = getClientIp(req);
    const now = Date.now();
    const previous = rateLimitStore.get(ip) ?? {
      count: 0,
      firstRequestAt: now,
    };

    if (now - previous.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
      previous.count = 0;
      previous.firstRequestAt = now;
    }

    previous.count += 1;
    rateLimitStore.set(ip, previous);

    if (previous.count > MAX_REQUESTS_PER_WINDOW) {
      return new Response(
        JSON.stringify({ success: false, error: "Too many requests. Please wait a moment and try again." }),
        { status: 429 }
      );
    }

    const data = await req.json();
    const token = data.token;

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "reCAPTCHA verification failed." }),
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Server CAPTCHA configuration is missing." }),
        { status: 500 }
      );
    }

    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }),
    });

    const verifyData = await verifyResponse.json();
    if (!verifyData.success || (typeof verifyData.score === "number" && verifyData.score < 0.4)) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed CAPTCHA verification." }),
        { status: 400 }
      );
    }

    if (verifyData.action && verifyData.action !== "booking") {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid CAPTCHA action." }),
        { status: 400 }
      );
    }

    let { name, email, event, date, message, company } = data;

    if (company && company.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: "Spam detected." }),
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !event || !date) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "All required fields must be filled.",
        }),
        { status: 400 }
      );
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email address.",
        }),
        { status: 400 }
      );
    }

    const normalizedDate = date.trim();
    if (!validator.isISO8601(normalizedDate)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid event date.",
        }),
        { status: 400 }
      );
    }

    const eventDate = new Date(normalizedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Event date must be today or later.",
        }),
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name must be between 2 and 100 characters.",
        }),
        { status: 400 }
      );
    }

    const trimmedEvent = event.trim();
    if (trimmedEvent.length < 3 || trimmedEvent.length > 80) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Event type must be between 3 and 80 characters.",
        }),
        { status: 400 }
      );
    }

    const trimmedMessage = message ? message.trim() : "";
    if (trimmedMessage.length > 1000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Message must be 1000 characters or fewer.",
        }),
        { status: 400 }
      );
    }

    // Sanitize inputs
    name = validator.escape(trimmedName);
    email = validator.normalizeEmail(email || "");
    event = validator.escape(trimmedEvent);
    date = validator.escape(normalizedDate);
    message = validator.escape(trimmedMessage);

    // Create email HTML
    const emailHtml = `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Event Type:</strong> ${event}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kinyuaalex80@gmail.com",
      subject: `New Booking: ${event}`,
      html: emailHtml,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Booking API Error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}