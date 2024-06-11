import express from 'express';
const postrouter=express.Router();

import { getPosts,createPosts, updatePosts,deletePosts } from '../controllers/posts.js';

postrouter.get('/',getPosts);

postrouter.post('/',createPosts);

postrouter.patch('/:id',updatePosts);

postrouter.delete('/:id',deletePosts);
export default postrouter; 