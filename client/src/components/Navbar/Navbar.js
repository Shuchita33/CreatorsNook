import React from "react";
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';
import photo from '../../images/photo.png';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

const Navbar=()=>{
    const ourUser=JSON.parse(localStorage.getItem('profile'));
    const classes=useStyles();
    const [user,setUser]=useState(ourUser);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

    const logout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/');
        setUser(null)
    }
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
                        {user.result.given_name}
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