import React, { useEffect } from "react";
import {Pagination, PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom';

import useStyles from './styles';

import { useDispatch,useSelector } from "react-redux";
import getPosts from "../actions/posts";

const Paginate=({page})=>{
    const classes=useStyles();
    const dispatch=useDispatch();

    useEffect(()=>{           // fetch posts for a specific page
        if(page) dispatch(getPosts(page)) 
    },[page])

    const {numberOfPages}=useSelector((state)=>state.posts);
    console.log(numberOfPages)
    return(
        <Pagination
        classes={{ul:classes.ul}}
        count={numberOfPages}
        page={Number(page)||1}
        variant='outlined'
        color='primary'
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}></PaginationItem>
        )}
        />      
    )
}
export default Paginate;