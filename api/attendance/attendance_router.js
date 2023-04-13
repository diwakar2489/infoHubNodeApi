const {attendanceStartTime} = require("../attendance/attendance_controller");
const router = require("express").Router();
const { checkToken } = require("../../middleware/auth/token_validation");

router.post("/", checkToken,attendanceStartTime);

module.exports = router;
