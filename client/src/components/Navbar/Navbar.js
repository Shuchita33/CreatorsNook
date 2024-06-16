import React from "react";
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';
import photo from '../../images/photo.png';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
const Navbar=()=>{
    const ourUser=JSON.parse(localStorage.getItem('profile'));
    const classes=useStyles();
    const [user,setUser]=useState(ourUser);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const logout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/');
        setUser(null)
    }
    useEffect(()=>{
        const token=user?.token;
        if(token && token.length<500){  //which is a manual login token
            const decodedToken=decode(token);
            if(decodedToken.exp*1000<new Date().getTime()){
                logout();
            }
        }
        else{  //for google signin
            if(user?.result.exp*1000<new Date().getTime()){  //the format of google oauth token is different from that of jwt
                logout();
            }
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')));  
    },[location])

    return(
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography className={classes.image} variant='h2' align='center'> CreatorsNook </Typography>
            <img className={classes.image} src={photo} alt='imm' height="90" width='80'></img>
        </div>
        <Toolbar className={classes.toolbar}>
            {user?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple} 
                            alt={user.result.name}
                            src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">
                        {user.result.given_name ? user.result.given_name :user.result.name}
                    </Typography>
                    <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>LogOut</Button>
                </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary">
                    Sign in
                </Button>
            )}
        </Toolbar>        
      </AppBar>
    )
}

export default Navbar;