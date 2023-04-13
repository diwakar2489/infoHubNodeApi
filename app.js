require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const employeeRouter = require("./api/employee/employee_router");
const authRouter = require("./api/login/login_router");
const attendanceRouter = require("./api/attendance/attendance_router");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "InfoHub Node API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Node Express and documented with Swagger",
        // license: {
        //   name: "MIT",
        //   url: "https://spdx.org/licenses/MIT.html",
        // },
        contact: {
          name: "InfoHub",
          url: "https://infohub.qbslearning.com",
          email: "info@hub.com",
        },
      },
      servers: [
        {
          url: "http://localhost:2489",
        },
      ],
    },
    apis: ["./api/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{ 
        explorer: true ,
        customCssUrl:"https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
        })
  );

app.use("/api/employee", employeeRouter);
app.use("/api/login",authRouter);
app.use("/api/attendance",attendanceRouter);


const port = process.env.APP_PORT || 4000;
app.listen(port,()=>{
    console.log("Server up and running on PORT:",port);
})