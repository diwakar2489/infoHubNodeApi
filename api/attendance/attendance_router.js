const {getTodayAttendanceMark,attendanceStartTime,attendanceEndTime} = require("../attendance/attendance_controller");
const router = require("express").Router();
const { checkToken } = require("../../middleware/auth/token_validation");

router.post("/time-in", checkToken,attendanceStartTime);
router.post("/time-out", checkToken,attendanceEndTime);
router.post("/today-attendance-mark", checkToken,getTodayAttendanceMark);

module.exports = router;
