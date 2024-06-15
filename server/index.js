import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import postsRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app=express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));


app.use(cors());
app.use('/posts',postsRoutes); 
app.use('/user',userRoutes);

const CONNECTION_URL=process.env.MONGO_URL;
const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>{
        console.log("Database connected successfully.")
    }))
    .catch((error)=>console.log(error.message));
