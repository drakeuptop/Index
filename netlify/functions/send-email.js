import { Resend } from 'resend';

export async function handler(event) {
  try {
    const { email, eventName, section, row, seat } = JSON.parse(event.body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "LSU Tickets <tickets@yourdomain.com>",
      to: email,
      subject: `Order Confirmation – ${eventName}`,
      html: `
        <h2>✅ Your LSU Order is Confirmed!</h2>
        <p><b>Event:</b> ${eventName}</p>
        <p><b>Section:</b> ${section}, Row ${row}, Seat ${seat}</p>
        <p>We’ll see you at the game! 🐯</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
