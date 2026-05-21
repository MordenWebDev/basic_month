const registerController=require("../controllers/auth.controller")
const authMiddleware=require("../middleware/auth.middleware")
const express=require("express")
const router=express.Router()

router.post("/register", registerController.register);
router.post("/login", registerController.login);
router.get("/me", authMiddleware, registerController.me);
module.exports = router;