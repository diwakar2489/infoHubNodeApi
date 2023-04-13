const { login, authGoogleRecaptchRouter,forgotPassword,verifyOtp,changePassword} = require("./login_controller");
const router = require("express").Router();


router.post("/", login);
router.post("/google-verify-token", authGoogleRecaptchRouter);
router.post("/forgot-password",forgotPassword)
router.post("/otp-verify", verifyOtp);
router.put("/change-password",changePassword)

module.exports = router;