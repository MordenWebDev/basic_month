
const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const register=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
         const hashedPassword = await bcrypt.hash(password, 4);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

const login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const me=async(req,res)=>{
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.status(200).json({ message: "User found", user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

module.exports = { register, login, me };
