```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Admin Verification Code',
    html: `
      <h2>Your Verification Code</h2>
      <p>Use the following code to complete your login:</p>
      <h1 style="color: #4F46E5; font-size: 32px;">${code}</h1>
      <p>This code will expire in 10 minutes.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
```