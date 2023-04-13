const dbConn = require("../../config/database");
module.exports = {
    TimeInMarkYourAttendance: (attData, callBack) => {
      var command = 'INSERT INTO tm_user_attendance (user_id,start_time,att_date,status,created_on,created_by) VALUES (?,?,?,?,?,?)';
      
      dbConn.query(command, [
        attData.user_id,
        attData.start_time,
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
        
         dbConn.query('select  AT.id,COUNT(AT.user_id) AS `Total` ,AT.user_id,AT.start_time,AT.att_date,AT.status from tm_user_attendance as AT ' +
        ' WHERE AT.user_id = "'+id+'" and att_date = "'+TodayDate+'"', (error, results ,fields) => {
            
              if (error) {
                  callBack(error);
              } else {
                //console.log(run.sql);return false;
                  callBack(null, results[0]);
              }
          })
        
      },
      TimeOutMarkYourAttendance: (ID,attData, callBack) => {

        var command = 'update tm_user_attendance set end_time =?,updated_on=?,updated_by = ? where id= ?'
        // var command = 'INSERT INTO tm_user (email,password,comp_id,dept_id,role_id,status,updated_on,updated_by) VALUES (?,?,?,?,?,?,?,?)';
         //var id = uuidv1();
         dbConn.query(command, [
            attData.end_time,
            attData.updated_on,
            attData.updated_by,
            ID ],
             (err, res) => {
                 if (err) {
                    // console.log(err)
                    callBack(err);
                 } else {
                    callBack(null, res);
                 }
             })
      }
};