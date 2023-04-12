const dbConn = require("../../config/database");
module.exports = {
  addEmployee: (requestDataOne,requestDataTwo, callBack) => {
      var command = 'INSERT INTO tm_user (user_type,email,password,comp_id,dept_id,role_id,status,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?)';
      
      dbConn.query(command, [
        requestDataOne.user_type,
        requestDataOne.email,
        requestDataOne.password,
        requestDataOne.comp_id,
        requestDataOne.dept_id,
        requestDataOne.role_id,
        requestDataOne.status,
        requestDataOne.created_on,
        requestDataOne.created_by],
        (error, results, fields) => {
            if (error) {
                console.log(error)
               return callBack(error);
            } else {
                var user_id = results.insertId;
               // console.log('Last insert ID', user_id);
                var command2 = 'INSERT INTO tm_user_detail (user_id, emp_code,rept_mng_id,joining_date,fname,mname,lname,gender,contact_no,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                dbConn.query(command2, [
                        user_id,
                        requestDataTwo.user_code,
                        requestDataTwo.rept_mng_id,
                        requestDataTwo.joining_date,
                        requestDataTwo.fname,
                        requestDataTwo.mname,
                        requestDataTwo.lname,
                        requestDataTwo.gender,
                        requestDataTwo.contact_no,
                        requestDataTwo.created_on,
                        requestDataTwo.created_by], (err, res) => {
                        if (err) throw err;
                });
               return callBack(null, results[0]);
            }
        })
      
    },
    getEmployeeByEmpId: (id, callBack) => {
      dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,UD.it_status,U.email,U.dept_id,U.role_id,U.user_type,U.link_status as link,UD.birthday,UD.profile_img,U.status,D.name as dept_name,R.name as role_name from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id '+
        'left join tm_department as D on D.id = U.dept_id ' +
        'left join tm_role as R on R.id = U.role_id WHERE U.id = "'+id+'"', (error, results ,fields) => {
            if (error) {
                callBack(error);
            } else {
                //console.log(res);return false;
                callBack(null, results[0]);
            }
        })
      
    },
    countEmployees:(search,callBack)=>{
      dbConn.query('select COUNT(U.id) as Total from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id where UD.fname LIKE "%' + search + '%" or UD.mname LIKE "%' + search + '%" or U.email LIKE "%' + search + '%" ', (err, res) => {
            if (err) {
                console.log(err)
                callBack(err);
            } else {
                callBack(null, res);
            }
        })
    },
    getEmployees: (search,pagees, pageSize,callBack) => {
     
      let page = pagees ? Number(pagees) : 1;
      const startingLimit = (page - 1) * pageSize;
      dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,UD.it_status,U.email,U.dept_id,U.role_id,U.user_type,U.link_status as link,U.status,Cm.name as company,D.name as dept_name,R.name as role_name from tm_user as U ' +
          'join tm_user_detail as UD on UD.user_id = U.id '+
          'left join tm_company as Cm on Cm.id = U.comp_id '+
          'left join tm_department as D on D.id = U.dept_id ' +
          'left join tm_role as R on R.id = U.role_id  where UD.fname LIKE "%' + search + '%" or UD.mname LIKE "%' + search + '%" or U.email LIKE "%' + search + '%"  ORDER BY U.id desc limit ' + startingLimit + ',' + pageSize, (error, results ,fields) => {
             if (error) {
                  //console.log(error)
                  callBack(error);
              } else {
                callBack(null, results);
              }
          })
    },
    getEmployeeBrithday:() =>{
      dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,UD.it_status,U.email,U.dept_id,U.role_id,U.user_type,U.link_status as link,UD.birthday,UD.profile_img,U.status,D.name as dept_name,R.name as role_name from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id '+
        'left join tm_department as D on D.id = U.dept_id ' +
        'left join tm_role as R on R.id = U.role_id WHERE MONTH(birthday) = MONTH(NOW()) AND DAY(birthday) = DAY(NOW())', (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                //console.log(res);return false;
                result(null, res);
            }
        })
    },
    updateEmployee: (data, callBack) => {
      dbConn.query(
        `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
        [
          data.first_name,
          data.last_name,
          data.gender,
          data.email,
          data.password,
          data.number,
          data.id
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    },
    deleteEmployee: (data, callBack) => {
      dbConn.query(
        `delete from registration where id = ?`,
        [data.id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    }
    
};