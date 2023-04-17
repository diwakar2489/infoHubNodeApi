require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({
    origin: ['https://infohub.qbslearning.com','http:://localhost:2489/api/login']
}));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const employeeRouter = require("./api/employee/employee_router");
const authRouter = require("./api/login/login_router");
const attendanceRouter = require("./api/attendance/attendance_router");

app.use("/api/employee", employeeRouter);
app.use("/api/login", authRouter);
app.use("/api/attendance", attendanceRouter);

const server = http.createServer(app);

const port = process.env.APP_PORT || 8082;
server.listen(port, () => {
    console.log("Server is running on PORT:", port);
})
