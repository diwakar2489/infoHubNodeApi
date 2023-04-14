require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const employeeRouter = require("./api/employee/employee_router");
const authRouter = require("./api/login/login_router");
const attendanceRouter = require("./api/attendance/attendance_router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "InfoHub HR API",
            description: "An API that allows users to obtain existing information of employees or post info of new employees",
            contact: {
                name: "Diwakar Developer",
                url: "https://www.qbslearning.com/",
                email: "diwakar.pandey@qbslearning.com"
            },
            license: {
                name: "Apache 2.0",
                url: "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            version: "1.0.11"

        },
        externalDocs: {
            description: "Find out more about Swagger",
            url: "http://swagger.io"
        },
        servers: [
            {
                "url": "http://localhost:2489"
            }
        ],
        tags: [
            {
              name: "Employee",
              description: "Operations about Employee",
              externalDocs: {
                description: "Find out more about our Employee",
                url: "http://swagger.io"
              }
            }
          ], 
    },
    // ['.routes/*.js']
    apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use("/api/employee", employeeRouter);
app.use("/api/login", authRouter);
app.use("/api/attendance", attendanceRouter);


const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
    console.log("Server up and running on PORT:", port);
})