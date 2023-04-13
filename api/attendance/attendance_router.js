const {attendanceStartTime,attendanceEndTime} = require("../attendance/attendance_controller");
const router = require("express").Router();
const { checkToken } = require("../../middleware/auth/token_validation");

router.post("/time-in", checkToken,attendanceStartTime);
router.post("/time-out", checkToken,attendanceEndTime);

module.exports = router;
