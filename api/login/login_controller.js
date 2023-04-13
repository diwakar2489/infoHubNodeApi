const { getUserByUserEmail, createUserOtp,getUsersOtpCodeByEmail,getUsersByEmail,forgotPassword } = require("./login_model");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const axios = require('axios');
var nodemailer = require('nodemailer');
// const { setEmailConfigration } = require("../../middleware/mail/mail_configuration");
// console.log(setEmailConfigration);return false;
var transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  // service: process.env.MAILER_SERVER,
  // secureConnection: false,
  auth: {
    user: process.env.MAILER_USER_EMAIL,
    pass: process.env.MAILER_USER_PASS
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
    ciphers:'SSLv3'
  },
});

module.exports = {

  login: (req, res) => {
    try {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            status: false,
            data: "Invalid email or password"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          console.log(results)
          const userId = results.id;
          const name = results.name;
          const img = results.user_img
          const email = results.email;
          const role_id = results.role_id;
          const dept_id = results.dept_id;
          const DepartmentName = results.dept_name;
          const RoleName = results.role_name;
          const password = results.password = undefined;
          const jsontoken = sign({ userId, name, img, email, role_id, dept_id, password, DepartmentName, RoleName }, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
          return res.json({
            status: true,
            msg: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            status: false,
            msg: "Invalid email or password"
          });
        }
      });
    } catch (error) {
      return res.status(201).json({
        status: false,
        msg: "Something Went Wrong",
      });
    }
  },
  authGoogleRecaptchRouter: async (req, res) => {
    try {
      const token = req.body.token;
      const secret = req.body.secret;
      // replace APP_SECRET_KEY with your reCAPTCHA secret key
      let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
      //console.log(response);return false;
      if (response) {
        return res.status(200).json({
          status: true,
          msg: "Success!! Hurray!! you have submitted the form",
          data: response.data
        });
      } else {
        return res.status(201).json({
          status: false,
          msg: "Verification expired. check the checkbox again",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: "Error!! You must confirm you are not a robot"
      })
    }
  },
  forgotPassword: (req, res) => {
    try {
     // console.log(transporter);return false;
      const { email } = req.body;
      getUserByUserEmail(email, (err, result) => {
        if (result != '') {

          let otpcode = Math.floor((Math.random() * 10000) + 1);
          let OtpData = {
            email: req.body.email,
            code: otpcode,
            expiresIn: new Date().getTime() + 300 * 1000
          }
         
          var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: 'diwakar.pandey@qbslearning.com',
            subject: 'verify otp',
            text: `Your otp id ${otpcode}`
          };
        
          transporter.sendMail(mailOptions, function (error, info) {
            console.log(info)
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              createUserOtp(OtpData, (error, UserInfo) => {
                if (error) {
                  console.log(error);
                } else {
                  res.status(200).json({
                    status: true,
                    msg: 'Email sent check your email id' + info.response,
                    data: UserInfo
                  });
                }
    
              });
            }
          });
          
        } else {
          res.status(200).json({ status: false, msg: 'email id is not vaild' });
        }
      })
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: "Error!! You must confirm you are not a robot"
      })
    }
  },
  verifyOtp:(req,res)=>{
    try{
      const { email, code } = req.body;
      getUsersOtpCodeByEmail(email, code, (err, data) => {
          if (data != '') {
              let currentTime = new Date().getTime();
              let diff = data[0].expiresIn - currentTime;
              if (diff < 0) {
                  res.status(201).json({ status: false, msg: "Otp time expires" });
              } else {
                  res.status(201).json({ status: true, msg: "Otp verify Successfully" });
              }
          } else {
              res.status(201).json({ status: false, msg: "OTP is not vaild please check" });
          }
      });

    }catch(error) {
      res.status(201).json({
        state:false,
        msg:"something when wrong!"
      })
    }
  },
  changePassword:(req,res) =>{
    try{
      const { email, password } = req.body;
      getUsersByEmail(email, async (err, data) => {
          if (data != '') {
            const salt = genSaltSync(10);
            const hashPassword = hashSync(password, salt);
              
              const updateData = {
                  password: hashPassword
              }
              forgotPassword(email, updateData, (err, UserInfo) => {
                  if (UserInfo) {
                      res.status(200).json({ status: true, msg: "Password update successfully" });
                  } else {
                      res.status(201).json({ status: false, msg: "Something Went Wrong" });
                  }
              })
          } else {
              res.status(400).json({ status: false, msg: "Not Match email id" });
          }
      });
    }catch(error){
      res.status(201).json({ status: false, msg: "Something Went Wrong" });
    }
  },
};