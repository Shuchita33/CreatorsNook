import {React,useEffect,useState} from 'react';
import FileBase from 'react-file-base64';
import {Paper, Box, Typography,Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getProfile,updateProfile,createProfile } from "../../actions/user";
import { useLocation } from 'react-router-dom';
import useStyles from './styles';

const Profile = () => {
  const classes=useStyles();
  const dispatch=useDispatch();
  const location=useLocation();

  const[Isprofile,setIsProfile]=useState(false);
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
  
  const user=location.state;
  const userId = user._id || user.sub;

  useEffect(() => {
    const fetchData = async () => {
      let profData = await dispatch(getProfile(userId));
      console.log(profData)
      if (!profData) {
       setIsProfile(false);

       setFormData({
        displayname: user.name || user.given_name,
        email: user.email,
       })
      }
      else{ 
        setIsProfile(true);   
        setFormData(profData);
      }
      
    };

   fetchData();
  }, [user?._id, user?.sub]);
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(Isprofile){
      dispatch(updateProfile(userId, formData));
      console.log('Updated Profile Data:', formData);
    }

    else{
      
      dispatch(createProfile({...formData,userId:userId}));
      console.log('Created successfully');
    }

    handleClose();
  };
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', width: '100%' }} elevation={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{formData?.displayname} </Typography>
        {Isprofile ?
        <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginTop: '10px' }}>
          Edit Profile
        </Button>:
        <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginTop: '10px' }}>
          Create Public Profile
        </Button>}
      </Box>
      
      <Typography variant="h6">{formData?.email} </Typography>
      <Typography variant="h6">{formData?.contact} </Typography>
      <Typography variant="h6">{formData?.birthdate?.split('T')[0]} </Typography>
      <Typography variant="h6">{formData?.bio} </Typography>

      <Dialog open={open} onClose={handleClose}>
       {Isprofile?<DialogTitle>Edit Profile</DialogTitle>:<DialogTitle>Create Profile</DialogTitle>}
        <DialogContent>
          <TextField
            margin="dense"
            name="displayname"
            label="Full Name"
            type="text"
            fullWidth
            value={formData?.displayname}
            onChange={(e)=>{
              setFormData({...formData,displayname:e.target.value})
            }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData?.email}
            onChange={(e)=>{
              setFormData({...formData,email:e.target.value})
            }}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contact"
            type="text"
            fullWidth
            value={formData?.contact}
            onChange={(e)=>{
              setFormData({...formData,contact:e.target.value})
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
            onChange={(e)=>{
              setFormData({...formData,bio:e.target.value})
            }}
          />
          <TextField
            margin="dense"
            name="website"
            label="Website"
            type="text"
            fullWidth
            value={formData?.website}
            onChange={(e)=>{
              setFormData({...formData,website:e.target.value})
            }}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={formData?.location}
            onChange={(e)=>{
              setFormData({...formData,location:e.target.value})
            }}
          />
          <TextField
            margin="dense"
            name="birthdate"
            label="Birthdate"
            type="date"
            fullWidth
            value={formData?.birthdate}
            onChange={(e)=>{
              setFormData({...formData,birthdate:e.target.value})
            }}
          />
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, profilePicture: base64 })} /></div>
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
  );
}

export default Profile;
