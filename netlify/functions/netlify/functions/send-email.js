import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    const { to, subject, html } = JSON.parse(event.body);

    const data = await resend.emails.send({
      from: 'LSU Tickets <onboarding@resend.dev>',
      to,
      subject,
      html
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
