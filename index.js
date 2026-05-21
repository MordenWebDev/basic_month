require("dotenv").config();
const express =require("express")
const app=express()
const PORT=process.env.PORT ||3000
const connectDB=require("./src/config/db")


app.get("/",(req,res)=>{
    res.status(200).json({ message: "server running" })
})

connectDB()
app.listen(PORT,()=>{
    console.log("server is running")
})