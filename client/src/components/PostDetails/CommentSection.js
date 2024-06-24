import React from 'react'
import { useState,useRef } from 'react';
import { Typography, TextField, Button, IconButton, Paper, Snackbar } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {commentPost, deleteCommentPost} from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({post}) => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const commentsRef=useRef(null);

    const [comments,setComments]=useState(post?.comments);
    const [comment,setComment]=useState('');
    const user=JSON.parse(localStorage.getItem('profile'));
    
    const handleClick= async()=>{
        const finalComment=`${user?.result?.name || user?.result?.given_name}:${comment}`;
        console.log(finalComment,post?._id);
        const newcomment =await dispatch(commentPost(finalComment,post?._id));
        // console.log( commentsRef.current);      
        setComments(newcomment);
        setComment('');

        setTimeout(() => {
          if (commentsRef.current) {
              commentsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
      }, 0);
    }
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
    const handleDelete = async (index) => {
      setOpenSnackbar(true);
      const newComments = await dispatch(deleteCommentPost(post?._id, index));
      setComments(newComments);
      
    };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Comments</Typography>
            {comments.map((c, i) => (
               <div key={i} className={classes.comment}>
               <Typography ref={commentsRef} gutterBottom variant='subtitle1'>
                   <strong>{c.split(':')[0] + ' : '}</strong>
                   {c.split(':')[1]}
               </Typography>
               <div>
               {(user?.result?.name || user?.result?.given_name) === c.split(':')[0] && (
                   <IconButton onClick={() => handleDelete(i)} aria-label="delete" className={classes.deleteComment}>
                       <DeleteIcon style={{height:'2vh',width:'2vh',color:'black'}} />
                   </IconButton>                              
               )}
               </div>
           </div>         
          ))}
                  
        </div>
        {(user?.result?.name || user?.result?.given_name) ? (
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
        ):(<Paper className={classes.paper}>
          <Typography variant="h6" align="center">
              Please Sign in to Add Comments
          </Typography>
      </Paper>)}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Comment deleted"
    />                   
    </div>

  )
}

export default CommentSection;
