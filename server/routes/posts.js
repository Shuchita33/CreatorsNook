import express from 'express';
const postrouter=express.Router();

import { getPosts,createPosts } from '../controllers/posts.js';

postrouter.get('/',getPosts);

postrouter.post('/',createPosts);
export default postrouter; 