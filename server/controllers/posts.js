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
