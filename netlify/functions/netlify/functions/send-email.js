import { Resend } from "resend";

export default async (req, context) => {
  try {
    const body = await req.json();
    const { email, eventTitle, dateTime, venue, seats } = body || {};

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: "Missing email" }), { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `LSU Order – ${eventTitle}`;
    const html = `
      <p>Your order is confirmed.</p>
      <p><strong>Event:</strong> ${eventTitle}</p>
      <p><strong>When:</strong> ${dateTime}</p>
      <p><strong>Where:</strong> ${venue}</p>
      <p><strong>Seats:</strong> ${seats}</p>
      <p>Thank you for your purchase!</p>
    `;

    const { error } = await resend.emails.send({
      from: "LSU Tickets <tickets@yourdomain.example>", // or a verified Resend domain
      to: email,
      subject,
      html
    });

    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
  }
};
