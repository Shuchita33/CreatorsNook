import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
export const getPosts= async(req,res)=>{
    try{
        const msg=await PostMessage.find();
        res.status(200).json(msg);

    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}
export const createPosts= async(req,res)=>{
    const postGotten=req.body;
    const newPost=new PostMessage(postGotten);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}
export const updatePosts= async(req,res)=>{
    const{ id: _id}=req.params;
    const post=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with this ID");
    const updtpost={...post,_id};
    const updatedPost= await PostMessage.findByIdAndUpdate(_id,updtpost,{new:true});

    res.json(updatedPost);
}