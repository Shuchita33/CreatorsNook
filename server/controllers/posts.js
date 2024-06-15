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
    const newPost=new PostMessage({...postGotten,creator:req.userId,createdAt:new Date().toISOString()});
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
export const deletePosts=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this ID");

    await PostMessage.findByIdAndDelete(id);

    res.json({message:'Post Deleted Successfully'})
}
export const likePost=async(req,res)=>{
    const{id}=req.params;
    
    if(!req.userId) return res.json({message:"Unauthenticated "})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this ID");

    const post=await PostMessage.findById(id);

    const index=post.likes.findIndex((id)=>id===String(req.userId));
    if(index===-1){ //like
        post.likes.push(req.userId);
    }
    else{
        post.likes=post.likes.filter((id)=>id!==String(req.userId));
    }
    const updtpost=post
    const updatedPost=await PostMessage.findByIdAndUpdate(id,updtpost,{new:true});
    res.json(updatedPost);
}