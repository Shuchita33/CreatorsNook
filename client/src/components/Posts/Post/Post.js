import React, { useEffect, useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import useStyles from './styles';
import { deletePost,likePost } from "../../../actions/posts";

const Post=({post, setCurrentId})=>{
    const classes = useStyles();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('profile'));
    const[likes,setLikes]=useState(post?.likes)
    const userId=(user?.result?.sub || user?.result?._id);

    const hasLiked=likes.find((like) => like === userId);

    const handleLike=async()=>{
      dispatch(likePost(post._id));
      if(hasLiked){
        setLikes(likes.filter((id)=>id !==userId)); //unliking -> removing that user from likes array
      }
      else{
        setLikes([...likes,userId]);
      }
    }
    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like ===userId )
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    const openPost=()=>{
      navigate(`/posts/${post._id}`);
    }

    return(
        <Card className={classes.card} raised elevation={6}>
          <ButtonBase className={classes.cardAction} >
              <CardMedia className={classes.media} image={post.selectedFile}  title={post.title} onClick={openPost}/>
              <div className={classes.overlay}>
                  <Typography variant="h6">{post.name}</Typography>
                  <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
              </div>
              {/* update button only visible for user who created the post */}
              {(user?.result.sub===post?.creator || user?.result._id===post?.creator) 
                      &&
              (<div className={classes.overlay2}>
                  <Button style={{ color: 'white' }} size="small" onClick={()=>{setCurrentId(post._id)}}>
                      <MoreHorizIcon fontSize="medium" />
                  </Button>
              </div>)}

              <div className={classes.details}>
                  <Typography variant="body2" color="textSecondary" 
                      component="h2">{post.tags.map((tag) => `#${tag} `)}
                  </Typography>
              </div>
              <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
              <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
              </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes></Likes>
                </Button>
                {/* delete button only visible for user who created the post */}
                {(user?.result.sub===post?.creator || user?.result._id===post?.creator) 
                    &&
                 (<Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id)); window.location.reload();}}>
                    <DeleteIcon fontSize="small" /> Delete
                  </Button>)
                }
               
            </CardActions>
    </Card>
    )       
}
export default Post;