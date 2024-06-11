import React, {useEffect, useState} from "react"
import useStyles from './styles';
import FileBase from 'react-file-base64';
import {
 TextField, Button, Typography, Paper
} from '@material-ui/core';

import {useDispatch,useSelector} from 'react-redux';
import {createPost,updatePost} from '../../actions/posts';

//get the current Id:

const Form=({currentId,setCurrentId})=>{
    const [postData,setPostData]=useState({
        creator:'', title:'', message:'',tags:'', selectedFiles:''
    })
    //fetch data using redux, to auto fill into from upon clicking on update 
    const post = useSelector((state) => currentId?state.posts.find((p)=>p._id===currentId):null); 
    //populate the data of the form
    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    },[post]);
    const classes=useStyles();
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        console.log(postData)
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,postData));
        }
        else{
            dispatch(createPost(postData));  //dispatched action
        }
        clear();
    }
    const clear=()=>{
        setCurrentId(null);
        setPostData({creator:'', title:'', message:'',tags:'', selectedFiles:''})
    }
    return(
       <Paper className={classes.paper}>                {/* //add two classes for margin b/t textfields */}
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6"> {currentId?`Editing`:`Creating`} a Post </Typography>
            <TextField 
                name="creator" 
                variant="outlined"
                label='Creator'
                fullWidth
                value={postData.creator}
                onChange={(e)=>{setPostData({ ...postData,   //regain the prev data
                    creator:e.target.value
                })}}
            ></TextField>
            <TextField 
                name="title" 
                variant="outlined"
                label='Title'
                fullWidth
                value={postData.title}
                onChange={(e)=>{setPostData({ ...postData,  
                    title:e.target.value
                })}}
            ></TextField>
            <TextField 
                name="message" 
                variant="outlined"
                label='Message'
                fullWidth
                value={postData.message}
                onChange={(e)=>{setPostData({ ...postData,   
                    message:e.target.value
                })}}
            ></TextField>
            <TextField 
                name="tags" 
                variant="outlined"
                label='Tags'
                fullWidth
                value={postData.tags}
                onChange={(e)=>{setPostData({ ...postData,   
                    tags:e.target.value
                })}}
            ></TextField>
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
       </Paper>
    )
}
export default Form;