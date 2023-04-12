require("dotenv").config();
const express = require("express");
const axios = require('axios');
//const cors = require('cors');
const app = express();
const employeeRouter = require("./api/employee/employee_router");
const authRouter = require("./api/login/login_router");

app.use(express.json());
//app.use(express.urlencoded({extended:true}));
//app.use(cors());


app.use("/api/employee", employeeRouter);
app.use("/api/login",authRouter);


const port = process.env.APP_PORT || 4000;
app.listen(port,()=>{
    console.log("Server up and running on PORT:",port);
})