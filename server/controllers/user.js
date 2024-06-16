//logic to signin,signup -- hashing required
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';     //first create user model

export const signin=async(req,res)=>{
    const {email,password}=req.body;        
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User doesn't exisit"});

        const isPassCorrect=await bcrypt.compare(password,existingUser.password);
        if(!isPassCorrect) return res.status(400).json({message:"Invalid Credentials"});
        const token=jwt.sign({email:existingUser.email, id:existingUser._id},process.env.SECRET_KEY,{expiresIn:'1h'});
        res.status(200).json({result:existingUser,token});

     } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}
export const signup=async(req,res)=>{
    const{email,password,confirmPassword,firstName,lastName}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(404).json({message:"User already exists"});

        if(password!=confirmPassword) return res.status(400).json({message:"Passwords don't match"});

        const hashedPass=await bcrypt.hash(password,12);
        const result=await User.create({email,password:hashedPass,name:`${firstName} ${lastName}`});

        const token=jwt.sign({email:result.email, id:result._id},process.env.SECRET_KEY,{expiresIn:'1h'});
        res.status(200).json({result,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

