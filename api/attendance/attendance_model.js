const dbConn = require("../../config/database");
module.exports = {
    markYourAttendance: (attData, callBack) => {
      var command = 'INSERT INTO tm_user_attendance (user_id,start_time,end_time,att_date,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)';
      
      dbConn.query(command, [
        attData.user_id,
        attData.start_time,
        attData.end_time,
        attData.att_date,
        attData.status,
        attData.created_on,
        attData.created_by],
        (error, results, fields) => {
            if (error) {
                console.log(error)
               return callBack(error);
            } else {
               return callBack(null, results[0]);
            }
        })
      
    },
    getTodayEmpAttendanceById: (id,TodayDate, callBack) => {
        
         dbConn.query('select  COUNT(AT.user_id) AS `Total` ,AT.user_id,AT.start_time,AT.att_date from tm_user_attendance as AT ' +
        ' WHERE AT.user_id = "'+id+'" and att_date = "'+TodayDate+'"', (error, results ,fields) => {
            
              if (error) {
                  callBack(error);
              } else {
                //console.log(run.sql);return false;
                  callBack(null, results[0]);
              }
          })
        
      },
};