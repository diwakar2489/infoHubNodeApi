const { login, authGoogleRecaptchRouter} = require("./login_controller");
const router = require("express").Router();


router.post("/", login);
router.post("/google-verify-token", authGoogleRecaptchRouter);

module.exports = router;