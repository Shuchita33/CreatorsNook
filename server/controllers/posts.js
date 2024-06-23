import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

//COMMENT
export const commentPost=async(req,res)=>{
    const {id}=req.params;
    const {value}=req.body;
    // console.log(id);
    try {
        const post=await PostMessage.findById(id);
        post.comments.push(value);
        
        const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}
//FETCH ALL POSTS
export const getPosts= async(req,res)=>{
    const page=req.query;
    // console.log(page.page)

    try{
        const LIMIT=6;
        const startIndex=(Number(page.page)-1)*LIMIT; //get starting index of every page
        const total=await PostMessage.countDocuments({}); // the total number of pages we would have
        const numberofPages=Math.ceil(total/LIMIT);

        const postsmsg=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        // to fetch posts newest to oldest, a certain no. for each page, by skipping the ones already fetched on prev page
        // console.log(postsmsg)
        res.status(200).json({data: postsmsg,
                              currentPage:Number(page.page),
                              numberofPages:numberofPages});

    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

//CREATE A POST
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

//UPDATE POST
export const updatePosts= async(req,res)=>{
    const{ id: _id}=req.params;
    const post=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with this ID");
    const updtpost={...post,_id};
    const updatedPost= await PostMessage.findByIdAndUpdate(_id,updtpost,{new:true});

    res.json(updatedPost);
}

//DELETE POST
export const deletePosts=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this ID");

    await PostMessage.findByIdAndDelete(id);

    res.json({message:'Post Deleted Successfully'})
}

//LIKE POST
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

//SEARCH POST
export const getPostsBySearch= async(req,res)=>{
    const {searchQuery,tags}=req.query;
    try {       
        const title=new RegExp(searchQuery,'i');
        //return posts where title matches or there is one matching tag in the array of tags we've got in query
        const posts= await PostMessage.find({ $or: [ {title},{ tags: { $in:tags.split(',')}} ]});
        
        res.status(200).json({data:posts}) //sending back to frntd
    } catch (error) {
        res.status(404).json(error);
    }
}

//FETCH A SINGLE POST
export const getPost=async(req,res)=>{
    const {id}=req.params;
    try {
        const post=await PostMessage.findById(id);
        // console.log(post);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
//DELETE COMMENT 
export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const { index } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    if (post) {
        post.comments.splice(index, 1);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
};