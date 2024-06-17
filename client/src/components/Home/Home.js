import React from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import {useState, useEffect } from 'react';
import { getPosts, getPostsBySearch} from '../../actions/posts';
import {Container, Grow, Grid,Paper, AppBar, TextField, Button} from '@material-ui/core';
import useStyles from './styles';
import Paginate from "../Pagination";
import { useNavigate,useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}
const Home=()=>{
    const[currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const dispatch=useDispatch();

    const query=useQuery();
    const navigate=useNavigate();
    const page=query.get('page')||1;
    const searchQuery=query.get('searchQuery');

    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);  //array of tags

    const handleKeyPress=(e)=>{
      if(e.keycode===13){
        searchPost();    //search
      }
    }
    const handleAdd=(tag)=>{
        setTags([...tags,tag]); // added upon ENTER key press
    }
    const handleDelete=(tagdelete)=>{
        setTags(tags.filter((tag)=>tag!==tagdelete));  //delete from array of tags
    }

    const searchPost=()=>{
      
      if(search.trim() || tags){   //if search field contains a term, make sure it is free of ending spaces
        console.log(search,tags);
        dispatch(getPostsBySearch({search,tags:tags.join(',')}));                  //dispatch --> fetch search post i.e; need to create a redux action and a reducer to search posts
        
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }
      else{
        navigate('/');
      }
    }
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]) // to reload the app on the currentId change also (upon updation)

    return(
        <Grow in>
        <Container maxWidth='xl'>
          <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3} >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField 
                  name="search"
                  variant="outlined"
                  label='Search Posts'
                  fullWidth
                  value={search}
                  onKeyUp={handleKeyPress}
                  onChange={(e)=>{setSearch(e.target.value)}}>
                </TextField>
                <ChipInput
                  style={{margin:'10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                  >
                </ChipInput>
                <Button onClick={searchPost} color='primary' variant='contained' className={classes.searchButton}>SEARCH</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Paper elevation={6}>
                <Paginate></Paginate>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}
export default Home;