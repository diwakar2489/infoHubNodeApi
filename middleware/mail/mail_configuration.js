var nodemailer = require('nodemailer');
module.exports = {
    setEmailConfigration: (req,res) =>{
      const  transporter = nodemailer.createTransport({
            service: process.env.MAILER_SERVER,
            auth: {
              user: process.env.MAILER_USER_EMAIL,
              pass: process.env.MAILER_USER_PASS
            }
        });
        return transporter
    },
};