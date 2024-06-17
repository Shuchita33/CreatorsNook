import express from 'express';
const postrouter=express.Router();

import { getPosts,createPosts, updatePosts,deletePosts,likePost, getPostsBySearch } from '../controllers/posts.js';

import auth from '../middlewares/auth.js';

postrouter.get('/',getPosts);
postrouter.post('/', auth, createPosts);
postrouter.patch('/:id', auth, updatePosts);
postrouter.delete('/:id', auth, deletePosts);
postrouter.patch('/:id/likePost', auth, likePost);
postrouter.get('/search',getPostsBySearch);

export default postrouter; 