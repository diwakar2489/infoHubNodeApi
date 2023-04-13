const dbConn = require("../../config/database");
module.exports = {
  getUserByUserEmail: (email, callBack) => {
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,UD.profile_img as user_img,U.user_type,U.email,U.password,U.alt_email,U.dept_id,U.role_id,U.status,R.name as role_name,D.name as dept_name from tm_user as U ' +
      'join tm_user_detail as UD on UD.user_id = U.id ' +
      'join tm_department as D on D.id = U.dept_id ' +
      'join tm_role as R on R.id = U.role_id where U.email = "' + email + '"', (error, results) => {
        if (error) {
          callBack(error);
        } else {
          //console.log(res);return false;
          callBack(null, results[0]);
        }
      })
  },
  createUserOtp: (UserOtpReqData, result) => {
    var command = 'INSERT INTO tm_user_otp (email,code,expiresIn) VALUES (?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
      UserOtpReqData.email,
      UserOtpReqData.code,
      UserOtpReqData.expiresIn],
      (err, res) => {
        if (err) {
          console.log(err)
        } else {
          var otp_id = res.insertId;
          console.log('Last insert ID in users otp', otp_id);
          result(null, otp_id);
        }
      })
  },
  getUsersOtpCodeByEmail: (emailID, code, results) => {
    dbConn.query('select OT.* from tm_user_otp as OT  where OT.email = "' + emailID + '" and OT.code = "' + code + '"', (err, res) => {
      if (err) {
        results(err);
      } else {
        results(null, res);
      }
    })
  },
  getUsersByEmail: (emailID, results) => {
    dbConn.query('select OT.* from tm_user_otp as OT  where OT.email = "' + emailID + '"', (err, res) => {
      if (err) {
        results(err);
      } else {
        results(null, res);
      }
    })
  },
  forgotPassword: (emailId, userReqtData, result) => {
    if (emailId) {
      var command = 'update  tm_user set password = ? where email= ?'
      dbConn.query(command,
        [
          userReqtData.password,
          emailId
        ], (err, res) => {
          if (err) {
            console.log(err)
          } else {
            result(null, res);
          }
        })
    } else {
      console.log(err)
    }
  },

};