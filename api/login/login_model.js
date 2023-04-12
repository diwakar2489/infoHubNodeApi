const dbConn = require("../../config/database");
module.exports = {
    getUserByUserEmail: (email, callBack) => {
        dbConn.query(
          `select * from tm_user where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },
};