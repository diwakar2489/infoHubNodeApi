var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVER,
    auth: {
      user: process.env.MAILER_USER_EMAIL,
      pass: process.env.MAILER_USER_PASS
    }
  });
  module.exports.transporter