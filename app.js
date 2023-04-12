require("dotenv").config();
const express = require("express");
const axios = require('axios');
const cors = require('cors');
const app = express();
const employeeRouter = require("./api/employee/employee_router");
const authRouter = require("./api/login/login_router");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use("/api/employee", employeeRouter);
app.use("/api/login",authRouter);
app.post("/verify-token", async (req,res) => {
    try{
        let ,token = req.body;
        // replace APP_SECRET_KEY with your reCAPTCHA secret key
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${'APP_SECRET_KEY'}&response=${token}`);
        //console.log(response);return false;
        return res.status(200).json({
            success:true,
            message: "Token successfully verified",
            data: response.data
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Error verifying token"
        })
    }
});

const port = process.env.APP_PORT || 4000;
app.listen(port,()=>{
    console.log("Server up and running on PORT:",port);
})