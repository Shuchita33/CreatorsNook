//logic to signin,signup -- hashing required
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';     //first create user model
import Profile from '../models/Profile.js';
import PostMessage from '../models/postMessage.js';

export const signin=async(req,res)=>{
    const {email,password}=req.body;        
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User doesn't exist"});

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
export const getProfile=async(req,res)=>{
    const {id}=req.params;
    //console.log(id);
    try {
        let profile = await Profile.findOne({ userId: id });
        //console.log(profile);
        if(!profile){
            res.status(200).json(null);
        }
        
        if(profile) res.status(200).json(profile);      
        
    } catch (error) {
        res.status(500).json({message:"No user found"});
    }
}

export const createUserProfile = async (req, res) => {
    const profileData = req.body;
    //console.log(profileData);
    try {
        const createdprofile = new Profile(profileData);
        await createdprofile.save();

        res.status(201).json(createdprofile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const { id } = req.params; // id is the userId
    const profileData = req.body;
   
    try {
        let profile = await Profile.findOne({ userId: id });
        profile = await Profile.findOneAndUpdate({ userId: id }, profileData, { new: true });
        //console.log(profile);
        res.json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateUserName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });
        await PostMessage.updateMany({ creator: id }, { name });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
export const getPostsByUserId = async (req, res) => {
    const {username}=req.query;
    const {id} = req.params;
    // console.log(id);
    // console.log(username);
    try {
        const posts = await PostMessage.find({ creator: id }).sort({_id:-1});
        if(username){
            const updatedPosts = await Promise.all(
            posts.map(async (post) => {
                post.name = username;
                await post.save();
                return post;
            })
            );
            res.status(200).json(updatedPosts);
        }
        else res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};