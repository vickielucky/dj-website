import { Resend } from "resend";
import validator from "validator";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    let { name, email, event, date, message } = data;

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

    // Sanitize inputs
    name = validator.escape(name || "");
    email = validator.normalizeEmail(email || "");
    event = validator.escape(event || "");
    date = validator.escape(date || "");
    message = validator.escape(message || "");

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