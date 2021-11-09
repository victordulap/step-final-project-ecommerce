const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: 'vdclothes.step@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

module.exports = transporter;
