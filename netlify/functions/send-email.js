import { Resend } from "resend";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    const { email, subject, body } = JSON.parse(event.body || "{}");
    if (!email || !subject || !body) {
      return { statusCode: 400, body: JSON.stringify({ ok:false, error:"Missing email/subject/body" }) };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev", // swap later to your verified sender
      to: email,
      subject,
      html: body.replace(/\n/g, "<br>")
    });

    return { statusCode: 200, body: JSON.stringify({ ok:true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok:false, error:e.message }) };
  }
}
