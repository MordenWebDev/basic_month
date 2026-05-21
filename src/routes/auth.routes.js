const registerController=require("../controllers/auth.controller")
const express=require("express")
const router=express.Router()

router.post("/register", registerController.register);
router.post("/login", registerController.login);
module.exports = router;