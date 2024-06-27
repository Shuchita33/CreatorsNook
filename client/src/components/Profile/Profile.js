import {React,useEffect,useState} from 'react'
import {Paper, Box, Typography,Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getProfile } from "../../actions/user";
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const dispatch=useDispatch();
  const location=useLocation();

  const user=location.state;
  console.log(user);

  useEffect(()=>{
    if(user?._id){
      const userId=user?._id;
      dispatch(getProfile(userId));
  }
  if(user?.sub){
      const userId=user?.sub;
      console.log(userId);  
  }   

  },[user?._id,user?.sub])
  
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.name ||user.given_name ,
    email: user.email,
    contact:null,
    description:'',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    
    console.log('Updated Profile Data:', formData);
    handleClose();
  };
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', width: '100%' }} elevation={6}>
       <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{formData.fullName} </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginTop: '10px' }}>
          Edit Profile
        </Button>
      </Box>
      
      <Typography variant="h6">{formData.email} </Typography>
      <Typography variant="h6">{formData.contact} </Typography>
      <Typography variant="h6">{formData.description} </Typography>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="fullName"
            label="Full Name"
            type="text"
            fullWidth
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contact"
            type="int"
            fullWidth
            value={formData.contact}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
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
