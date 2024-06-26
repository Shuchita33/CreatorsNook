import React from "react";
import Post from './Post/Post';

import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from '../Posts/styles';

const Posts=({setCurrentId})=>{
   
    const {isLoading, posts} = useSelector((state) => state.posts);  //to select a state defined by reducers
    const classes=useStyles();
    // console.log(posts);

    if(!isLoading && !posts.length) return <h1>No Posts</h1>
    
    return(isLoading ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
        </Grid>
      ))
}
export default Posts;