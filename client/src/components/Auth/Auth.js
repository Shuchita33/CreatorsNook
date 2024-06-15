import React, { useState } from "react";
import{Avatar, Grid, Typography, Paper, Button, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlined  from "@material-ui/icons/LockOutlined";
import Input from "./input";
import {GoogleLogin,GoogleOAuthProvider} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from "../../actions/auth";
// import Icon from './icon';

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const classes=useStyles();
    const [isSignUp,setSignUp]=useState(true);

    const[showPassword, setShowPassword]=useState(true);
    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword)
    }

    const[formData,setFormData]=useState(initialState);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData,navigate));
        }
        else{
            dispatch(signin(formData,navigate));
        }

        // console.log(formData);
    }
    //fill the form manually
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const googleSuccess=async(res)=>{
        console.log(res);
        const decoded=jwt_decode(res?.credential);
        const result=decoded;
        const token=JSON.stringify(decoded)
        try {
            dispatch({type:'AUTH',data:{result,token}});
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure=()=>{
        console.log("Google Login Unsuccessful, Try Again!")
    }
    const switchMode=()=>{
        setSignUp((prevSignUp)=>!prevSignUp);
        handleShowPassword(false);
    }


    return(
        <GoogleOAuthProvider clientId="386751666581-00b4r6ea8lpb2r6vj6skdmanjklporer.apps.googleusercontent.com">
            <Container component="main" maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography variant="h5">{isSignUp?'SignUp':'SignIn'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignUp && (
                        <>
                        <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half></Input>
                        <Input name='lastName' label="Last Name" handleChange={handleChange} half></Input>   
                        </>
                    )}
                        <Input name='email' label='Email' handleChange={handleChange} type='email'></Input>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword}></Input>
                        {isSignUp && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type='password' ></Input>}
                </Grid>
                <GoogleLogin 
                    // render={(renderProps)=>(
                    //     <Button className={classes.googleButton} 
                    //             color='primary' 
                    //             fullWidth
                    //             onClick={renderProps.onClick}
                              
                    //             startIcon={<Icon></Icon>}
                    //             variant="contained"
                    //     >Google SignIn</Button>
                    // )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin">
                </GoogleLogin>
                <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignUp?'SignUp':'SignIn'}
                </Button>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                        {isSignUp?'Already have an account, Sign In':'Do not have an account, Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
       </Container>
        </GoogleOAuthProvider>
       
    )
}
export default Auth;
