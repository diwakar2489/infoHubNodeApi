const {getTodayAttendanceMark,attendanceStartTime,attendanceEndTime,getMyAttendanceList} = require("../attendance/attendance_controller");
const router = require("express").Router();
const { checkToken } = require("../../middleware/auth/token_validation");

router.post("/time-in", checkToken,attendanceStartTime);
router.post("/time-out", checkToken,attendanceEndTime);
router.post("/today-attendance-mark", checkToken,getTodayAttendanceMark);
router.post("/my-attendance-list", checkToken,getMyAttendanceList);

module.exports = router;
