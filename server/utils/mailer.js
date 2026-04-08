import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Transport error:", error);
  } else {
    console.log("Gmail mailer ready ✅");
  }
});

export async function sendNotification({ name, email, message }) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `,
  };

  return transporter.sendMail(mailOptions);
}

// Auto-reply to the sender 
export async function sendAutoReply(email, name) {
  const mailOptions = {
    from: `"DT Tech Portfolio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for contacting me 👋",
    html: `
      <h2>Hello ${name},</h2>
      <p>Thanks for reaching out! I’ve received your message and will get back to you soon.</p>
      <br/>
      <p>Best regards,<br/>DT Tech Solutions</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}