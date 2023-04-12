const { countEmployees,getEmployees,addEmployee,getEmployeeByEmpId,updateEmployee,deleteEmployee,getAllEmployeeBrithday } = require("./employee_model");
const { hashSync, genSaltSync } = require("bcrypt");
module.exports = {
    createEmployee: (req, res) => {
    try{
      //console.log(req.body);
        const { usertype,empcode, comp, dept, role, reportingMNG, joiningdate, fname, mname, lname, email, status, gender, contact, created_on, created_by } = req.body;
       // const body = req.body;
        const password = "Hive123";
        const salt = genSaltSync(10);
        const hashPassword = hashSync(password, salt);
          var firstRequestData = {
            email: email,
            user_type:usertype,
            password: hashPassword,
            status: status,
            comp_id: comp,
            dept_id: dept,
            role_id: role,
            created_on: created_on,
            created_by: created_by,
          }
          var secondRequestData = {
            user_code: empcode,
            rept_mng_id: reportingMNG,
            joining_date: joiningdate,
            fname: fname,
            mname: mname,
            lname: lname,
            gender: gender,
            contact_no: contact,
            created_on: created_on,
            created_by: created_by,
          }
          addEmployee(firstRequestData, secondRequestData, (err, results) => {
          if (err) {
            //console.log(err);
            return res.status(500).json({
              status: false,
              msg: "Database connection errror"
            });
          }
          return res.status(200).json({
            status: true,
            msg: "Employee data inserted successfully",
            data: results
          });
        
        });
      } catch (error) {
        res.status(201).json({ 
          status: false,
          msg: "Something Went Wrong",
          data: results
         });
        console.log(error);
      }
    },
    getEmployeeByEmpId: (req, res) => {
      try{
      const id = req.params.id;
     //console.log(req.params.id);return false;
      getEmployeeByEmpId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            status: false,
            msg: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          staus: true,
          data: results
        });
      });
      } catch (error) {
        res.status(201).json({ 
          status: false,
          msg: "Something Went Wrong",
          data: results
        });
        console.log(error);
      }
    },
    getEmployees: (req, res) => {
     
      try{
        //console.log(req.query);return false;
        const pageSize = 10;
        const search = req.query.query || '' ;
        const page = parseInt(req.query.page);
        countEmployees(search,(error1, total) => {
            getEmployees(search,page, pageSize,(err, results) => {
              //console.log(results);return false;
              if (err) {
                console.log(err);
                return;
              }
            return res.json({
              staus: true,
              nbPages: total[0].Total,
              page: page,
              limit: pageSize,
              users: results,
            });
          });
        });
      } catch (error) {
        res.status(201).json({ 
          status: false,
          msg: "Something Went Wrong",
          
        });
        console.log(error);
      }
    },
    getEmployeeBrithday:(req, res) =>{
      try {
        getAllEmployeeBrithday((error, data) => {
           // console.log(data);
                res.status(200).json({
                    status: true,
                    msg: 'Employee Upcomming Birthday Data fetch successfully',
                    result: data
                });
            });
      } catch (error) {
          res.status(201).json({ status: false, msg: 'Something Went Wrong' })
      }
    },
    updateEmployees: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateEmployee(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          staus:true,
          msg: "updated successfully"
        });
      });
    },
    deleteEmployee: (req, res) => {
      const data = req.body;
      deleteEmployee(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            staus: false,
            msg: "Record Not Found"
          });
        }
        return res.json({
          staus: true,
          msg: "Employee deleted successfully"
        });
      });
    }
};