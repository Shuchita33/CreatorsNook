import express from 'express';
const postrouter=express.Router();

import { getPosts,createPosts, updatePosts } from '../controllers/posts.js';

postrouter.get('/',getPosts);

postrouter.post('/',createPosts);

postrouter.patch('/:id',updatePosts);
export default postrouter; 