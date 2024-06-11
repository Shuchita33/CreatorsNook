import './App.css';
import {Container,AppBar, Typography, Grow, Grid} from '@material-ui/core';
import photo from './images/photo.png';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts'; 
import useStyles from './styles';

import { useDispatch } from 'react-redux';
import {useState, useEffect } from 'react';

import getPosts from './actions/posts';

function App() {
  const[currentId,setCurrentId]=useState(null)
  const classes=useStyles();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch]) // to reload the app on the currentId change also (upon updation)

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.image} variant='h2' align='center'> CreatorsNook </Typography>
        <img className={classes.image} src={photo} alt='imm' height="90" width='80'></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
