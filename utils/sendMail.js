import { createTransport } from "nodemailer";

export const sendMail = async (to, subject, text) => {
  const transport = createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });
};
