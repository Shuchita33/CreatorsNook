import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { Paper, Box, Typography, Button, TextField, Dialog, Divider, DialogActions, DialogContent, DialogTitle, CircularProgress} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, createProfile, updateUserName, getPostsByUser } from "../../actions/user";
import {  useNavigate,useParams } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import PostAddIcon from '@material-ui/icons/PostAdd';
import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const getUserName = JSON.parse(localStorage.getItem('profile'));

  const {isLoading, profile,posts} = useSelector((state) => state.user)
  //console.log(profile,isLoading)
  
  const [isProfile, setIsProfile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    bio: '',
    website: '',
    location: '',
    birthdate: '',
    profilePicture: ''
  });
  
  // const user = location.state;
  // const id = user._id || user.sub;
  const {id}=useParams();
  console.log(id);
  
  useEffect(() => {
    const fetchData = async () => {
      let profData = await dispatch(getProfile(id));
      console.log(profData);
      if (!profData) {
        setIsProfile(false);
        if(getUserName?.result.sub === id || getUserName?.result._id === id){
          setFormData({
            displayname: getUserName?.result.name,
            email: getUserName?.result.email,
          });
        }
        else{
          setFormData({
            displayname: "No profile data for user",
            email: "-",
          });
        }
       
      } else {
        setIsProfile(true);
        setFormData(profData);
      }
      dispatch(getPostsByUser(id));
      //console.log(posts);
    };

    fetchData();
  }, [getUserName?.result._id, getUserName?.result.sub,  id]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (isProfile) {
      dispatch(updateProfile(id, formData));
    } else {
      dispatch(createProfile({ ...formData, id: id }));
    }

    if (getUserName?.result.name !== formData.displayname) {
      if (getUserName?.result.name) {
        getUserName.result.name = formData.displayname;
      }
      localStorage.setItem('profile', JSON.stringify(getUserName));
      if (getUserName?.result._id) dispatch(updateUserName(id, formData.displayname));
      dispatch(getPostsByUser(id, formData.displayname));
     
    }
    handleClose();
  };
  
  const openPost=(_id)=>{
    navigate(`/posts/${_id}`);
  }

  return (isLoading ? <CircularProgress />:
  <>
    <Paper style={{ padding: '20px', borderRadius: '15px', width: '100%' }} elevation={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{profile?.displayname || formData?.displayname} </Typography>
        {isProfile && <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center" mx={1}>
            <ThumbUpIcon />
            <Typography variant="body1" style={{ marginLeft: '5px' }}>
              {profile?.likesCount}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mx={2}>
            <CommentIcon />
            <Typography variant="body1" style={{ marginLeft: '5px' }}>
              {profile?.commentsCount}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mx={2}>
            <PostAddIcon />
            <Typography variant="body1" style={{ marginLeft: '5px' }}>
              {profile?.postsCount}
            </Typography>
          </Box>
        </Box>}
        {(getUserName?.result.sub === id || getUserName?.result._id === id) && (
          <>
            {isProfile ? (
              <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginTop: '10px' }}>
                Edit Profile
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginTop: '10px' }}>
                Create Public Profile
              </Button>
            )}
          </>
        )}

      </Box>
      
      
      <Typography variant="h6">{profile?.email || formData?.email} </Typography>
      <Typography variant="h6">{profile?.contact} </Typography>
      <Typography variant="h6">{profile?.birthdate?.split('T')[0]} </Typography>
      <Typography variant="h6">{profile?.bio} </Typography>

      <Dialog open={open} onClose={handleClose}>
        {isProfile ? <DialogTitle>Edit Profile</DialogTitle> : <DialogTitle>Create Profile</DialogTitle>}
        <DialogContent>
          <TextField
            margin="dense"
            name="displayname"
            label="Full Name"
            type="text"
            fullWidth
            value={formData?.displayname}
            onChange={(e) => {
              setFormData({ ...formData, displayname: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contact"
            type="text"
            fullWidth
            value={formData?.contact}
            onChange={(e) => {
              setFormData({ ...formData, contact: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            multiline
            minRows={4}
            value={formData?.description}
            onChange={(e) => {
              setFormData({ ...formData, bio: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            name="website"
            label="Website"
            type="text"
            fullWidth
            value={formData?.website}
            onChange={(e) => {
              setFormData({ ...formData, website: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={formData?.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            name="birthdate"
            label="Birthdate"
            type="date"
            fullWidth
            value={formData?.birthdate}
            onChange={(e) => {
              setFormData({ ...formData, birthdate: e.target.value });
            }}
          />
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, profilePicture: base64 })} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
    {<Paper style={{ padding: '20px', borderRadius: '15px', width: '100%', marginTop:'3vh'}} elevation={6}>
          <Typography variant="h6">My posts : </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {posts.map(({ title, message, name, likes, selectedFile, _id }) => (
              <div style={{margin:'20px',cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle1'>{likes.length}</Typography>
                <img src={selectedFile} alt='post' width='200px'/>           
              </div>
            ))}
          </div>
        </Paper>}

  </>
  );
};

export default Profile;
