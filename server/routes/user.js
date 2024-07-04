import express from 'express';
import { signup,signin,getProfile,createUserProfile,updateUserProfile} from '../controllers/user.js';
import auth from '../middlewares/auth.js';
const userRouter=express.Router();

userRouter.post('/signin',signin);
userRouter.post('/signup',signup);
userRouter.get(`/:id/profile`,auth,getProfile);
userRouter.post(`/`,createUserProfile);
userRouter.patch('/updateProfile/:id', updateUserProfile);

export default userRouter;