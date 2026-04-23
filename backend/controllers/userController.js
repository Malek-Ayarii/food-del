import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// register user
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        // checking if user already exists
        const user = await userModel.findOne({email});
        if(user){
            return res.json({success:false,message:"User already exists"})
        }
        // validating email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"})
        }
        // validating password
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters long"})
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        // creating new user
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
       const savedUser = await newUser.save();
        // generating token
        const token = createToken(savedUser._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { loginUser, registerUser }

