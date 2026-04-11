import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNotification({ name, email, message }) {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.EMAIL_USER, // Change this if you signed up to Resend with a different email!
    subject: `New Contact from ${name} via DT Tech Portfolio`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h3 style="color: #333; border-bottom: 2px solid #007BFF; padding-bottom: 10px;">📫 New Contact Message</h3>
        <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007BFF;">${email}</a></p>
        
        <p style="margin-top: 20px; font-weight: bold; color: #333;">Message:</p>
        <div style="padding: 15px; background-color: #fff; border-left: 4px solid #007BFF; border-radius: 4px;">
          <p style="margin: 0; font-size: 15px; color: #444; white-space: pre-wrap;">${message}</p>
        </div>
        
        <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">Sent from your Portfolio seamlessly via Resend API.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend API failed:", error);
    throw new Error("Email sending failed: " + error.message);
  }
  
  return data;
}

export async function sendAutoReply(email, name) {
  console.log(`✅ Because we don't have a custom domain verified, we are skipping the auto-reply to the visitor (${email}). Custom domain verification is required by Resend to email other people.`);
  
  // Return dummy success so the API request successfully completes instead of crashing
  return { success: true };
}