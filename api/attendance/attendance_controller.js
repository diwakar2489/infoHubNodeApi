const { markYourAttendance,getTodayEmpAttendanceById } = require("./attendance_model");
module.exports = {
    attendanceStartTime: (req, res) => {
        try{
            const { EmpID, LoginTime,LogoutTime,AttendanceDate } = req.body;
            var AttData = {
                user_id: EmpID,
                start_time:LoginTime,
                end_time: LogoutTime,
                att_date: AttendanceDate,
                status:1,
                created_on: AttendanceDate,
                created_by: EmpID,
            }
            getTodayEmpAttendanceById(EmpID,AttendanceDate,(err,data) =>{
                console.log(data.Total)
                if(data.Total === 0){
                    markYourAttendance(AttData, (err, results) => {
                        if (err) {
                        //console.log(err);
                        return res.status(500).json({
                            status: false,
                            msg: "Database connection errror"
                        });
                        }
                        return res.status(200).json({
                            status: true,
                            msg: "Your Attendance Mark successfully",
                            data: results
                        });
                    
                    });
                }else{
                    return res.status(201).json({ 
                        status: false,
                        msg: "Your Attendance Already Marks"
                    });
                }
                
            })
           
            

        }catch (error){
            res.status(201).json({ 
                status: false,
                msg: "Something Went Wrong"
            });
        }
    }
}