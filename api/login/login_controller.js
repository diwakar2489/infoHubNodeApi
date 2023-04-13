const { getUserByUserEmail } = require("./login_model");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const axios = require('axios');

module.exports = {
    login: (req, res) => {
        try{
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
                  const jsontoken = sign({ userId,name,img,email,role_id,dept_id,password,DepartmentName,RoleName }, process.env.JWT_KEY, {
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
        }catch (error) {
            return res.status(201).json({ 
                status: false,
                msg: "Something Went Wrong",
                data: results
            });
        }
    },
    authGoogleRecaptchRouter: async (req, res) =>{
        try{
            const token = req.body.token;
            const secret = req.body.secret;
            // replace APP_SECRET_KEY with your reCAPTCHA secret key
            let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
            //console.log(response);return false;
            if(response){
                return res.status(200).json({
                    status:true,
                    msg: "Success!! Hurray!! you have submitted the form",
                    data: response.data
                });
            }else{
                return res.status(201).json({
                    status:false,
                    msg: "Verification expired. check the checkbox again",
                });
            }
        }catch(error){
            return res.status(500).json({
                status:false,
                msg: "Error!! You must confirm you are not a robot"
            })
        }
    }
}