import React from 'react'
import { useState,useEffect } from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {commentPost} from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({post}) => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const [comments,setComments]=useState(post?.comments);
    const [comment,setComment]=useState('');
    const user=JSON.parse(localStorage.getItem('profile'));
    
    const handleClick= async()=>{
        const finalComment=`${user?.result?.name || user?.result?.given_name}:${comment}`;
        console.log(finalComment,post?._id);
        const newcomment =await dispatch(commentPost(finalComment,post?._id));
        // console.log(comments);
        setComments(newcomment);
        setComment('');
    }
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Comments</Typography>
            {comments.map((c,i)=>(
                <Typography key={i} gutterBottom variant='subtitle1'>{c}</Typography>
            ))}
        </div>
        {(user?.result?.name || user?.result?.given_name) && (
            <div style={{width:'70%'}}>
            <Typography gutterBottom variant='h6'>Write a Comment</Typography>
            <TextField
                fullWidth
                minRows={4}
                variant='outlined'
                label="Comment"
                multiline
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
            ></TextField>
            <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} color='primary' variant='contained' onClick={handleClick}>Comment</Button>
        </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection;
