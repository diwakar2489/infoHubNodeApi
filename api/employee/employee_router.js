const { getEmployees,createEmployee,getEmployeeByEmpId,updateEmployees,deleteEmployee,getEmployeeBrithday } = require("./employee_controller");
const router = require("express").Router();
const { checkToken } = require("../../middleware/auth/token_validation");

router.get("/", checkToken, getEmployees);
router.post("/", checkToken,createEmployee);
router.get("/:id", checkToken,getEmployeeByEmpId);
router.patch("/", checkToken, updateEmployees);
router.delete("/", checkToken, deleteEmployee);
router.post("/birthday",checkToken,getEmployeeBrithday);

module.exports = router;