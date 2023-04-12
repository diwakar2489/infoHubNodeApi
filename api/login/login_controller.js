const { getUserByUserEmail } = require("./login_model");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

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
                  results.password = undefined;
                  const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
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
    }
}