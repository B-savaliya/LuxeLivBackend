import nodemailer from 'nodemailer';
import { MAIL_FROM, MAIL_USER, MAIL_PASSWORD } from '../config/db.config.js';

const sendEmail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: MAIL_FROM,
    to: to,
    subject: subject,
    html: body
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;

