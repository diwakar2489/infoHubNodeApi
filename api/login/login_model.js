const dbConn = require("../../config/database");
module.exports = {
    getUserByUserEmail: (email, callBack) => {
      dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.user_type,U.email,U.password,U.alt_email,U.dept_id,U.role_id,U.status,R.name as role_name,D.name as dept_name from tm_user as U ' +
      'join tm_user_detail as UD on UD.user_id = U.id '+
      'join tm_department as D on D.id = U.dept_id '+
      'join tm_role as R on R.id = U.role_id where U.email = "' + email + '"', (error, results) => {
          if (error) {
              callBack(error);
          } else {
              //console.log(res);return false;
              callBack(null, results[0]);
          }
      })
    },
};