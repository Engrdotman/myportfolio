import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNotification({ name, email, message }) {
  // Free tier requires from address to be 'onboarding@resend.dev'
  // and allows sending emails ONLY to the email address you signed up to Resend with!
  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to: process.env.EMAIL_USER, // Change this if you signed up to Resend with a different email!
    subject: `New Contact from ${name} via Portfolio`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
}

export async function sendAutoReply(email, name) {
  console.log(`✅ Because we don't have a custom domain verified, we are skipping the auto-reply to the visitor (${email}). Custom domain verification is required by Resend to email other people.`);
  
  // Return dummy success so the API request successfully completes instead of crashing
  return { success: true };
}