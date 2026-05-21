const registerController=require("../controllers/auth.controller")
const express=require("express")
const router=express.Router()

router.post("/register", registerController.register);
module.exports = router;