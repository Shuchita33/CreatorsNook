import express from 'express';
const postrouter=express.Router();

import { getPosts,createPosts, updatePosts,deletePosts,likePost } from '../controllers/posts.js';

postrouter.get('/',getPosts);

postrouter.post('/',createPosts);

postrouter.patch('/:id',updatePosts);

postrouter.delete('/:id',deletePosts);

postrouter.patch('/:id/likePost',likePost);
export default postrouter; 