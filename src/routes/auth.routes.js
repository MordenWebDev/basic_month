const registerController=require("../controllers/auth.controller")
const authMiddleware=require("../middleware/auth.middleware")
const express=require("express")
const router = express.Router()
const ratelimit = require("express-rate-limit")

const limiter=ratelimit({
    windowMs:15*60*1000,
    max:5,
    message:"Too many requests from this IP, please try again after 15 minutes"
})


router.post("/register", registerController.register);
router.post("/login", limiter,registerController.login);
router.get("/me", authMiddleware, registerController.me);
module.exports = router;