const { login } = require("./login_controller");
const router = require("express").Router();


router.post("/", login);

module.exports = router;