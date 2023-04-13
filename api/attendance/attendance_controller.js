const { TimeInMarkYourAttendance, TimeOutMarkYourAttendance, getTodayEmpAttendanceById } = require("./attendance_model");
module.exports = {
    attendanceStartTime: (req, res) => {
        try {
            const { EmpID, LoginTime, AttendanceDate } = req.body;
            var AttData = {
                user_id: EmpID,
                start_time: LoginTime,
                att_date: AttendanceDate,
                status: 1,
                created_on: AttendanceDate,
                created_by: EmpID,
            }
            getTodayEmpAttendanceById(EmpID, AttendanceDate, (err, data) => {
                //console.log(data.Total)
                var date_time = new Date();
                let date = ("0" + date_time.getDate()).slice(-2);
                let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
                let year = date_time.getFullYear();
                const completeDate = year+"-"+month+"-"+date;
                // console.log(completeDate);
                // console.log(AttendanceDate);
                if (data.Total === 0) {
                    if (completeDate === AttendanceDate) {
                        TimeInMarkYourAttendance(AttData, (err, results) => {
                            if (err) {
                                //console.log(err);
                                return res.status(500).json({
                                    status: false,
                                    msg: "Database connection errror"
                                });
                            }
                            return res.status(200).json({
                                status: true,
                                msg: "Your Attendance Time in Mark successfully",
                                data: results
                            });

                        });
                    } else {
                        return res.status(400).json({
                            status: false,
                            msg: "Your Attendance Not Possible next and Previous date"
                        });
                    }
                } else {
                    return res.status(201).json({
                        status: false,
                        msg: "Your Attendance Already Marks"
                    });
                }

            })
        } catch (error) {
            res.status(201).json({
                status: false,
                msg: "Something Went Wrong"
            });
        }
    },
    attendanceEndTime: (req, res) => {
        try {
            const { EmpID, LogoutTime, AttendanceDate } = req.body;
            var AttData = {
                end_time: LogoutTime,
                updated_on: AttendanceDate,
                updated_by: EmpID,
            }
            getTodayEmpAttendanceById(EmpID, AttendanceDate, (err, data) => {
                const AttendanceID = data.id;
                let today_att = new Date();
                
                let date = ("0" + today_att.getDate()).slice(-2);
                let month = ("0" + (today_att.getMonth() + 1)).slice(-2);
                let year = today_att.getFullYear();
                const completeDate = year+"-"+month+"-"+date;
               // console.log(year + "-" + month + "-" + date);
                // console.log(AttendanceDate);
                // console.log(today_att);return false;
               
                if(completeDate === AttendanceDate){
                    TimeOutMarkYourAttendance(AttendanceID, AttData, (err, results) => {
                        if (err) {
                            //console.log(err);
                            return res.status(500).json({
                                status: false,
                                msg: "Database connection errror"
                            });
                        }
                        return res.status(200).json({
                            status: false,
                            msg: "Your Attendance Time out Mark successfully",
                            data: results
                        });
                    });
                }else{
                    return res.status(400).json({
                        status: false,
                        msg: "Please check Your Attendance Time out Out of the Box"
                    });
                }
            });
        } catch (error) {
            res.status(201).json({
                status: false,
                msg: "Something Went Wrong"
            });
        }
    },
    getTodayAttendanceMark:(req,res)=>{
        try {
            const { EmpID, AttendanceDate } = req.body;
            getTodayEmpAttendanceById(EmpID, AttendanceDate, (err, results) => {
                //console.log(results);return false;
                if (err) {
                    //console.log(err);
                    return res.status(500).json({
                        status: false,
                        msg: "Database connection errror"
                    });
                }
                if(results.Total > 0){
                    return res.status(200).json({
                        status: true,
                        msg: "Today Attendance Mark successfully",
                        data: results
                    });
                }else{
                    return res.status(201).json({
                        status: false,
                        msg: "Today Attendance Mark Empty, please mark your Attendance"
                    });
                }
            })
        }catch(error){
            return res.status(201).json({
                status: false,
                msg: "Something Went Wrong"
            });
        }
    }
}