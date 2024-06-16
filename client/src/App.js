import './App.css';
import {Container} from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  const user=localStorage.getItem('profile');

  return (
    <BrowserRouter>
    <Container maxWidth='lg'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' exact Component={()=><Navigate to='/posts'/>}/>
        <Route path='/posts' exact Component={Home}/>
        <Route path='/posts/search' exact Component={Home}/>
        <Route path='/posts/:id' Component={PostDetails}/> 
        <Route path='/auth' Component={()=>(!user?<Auth/>: <Navigate to='/posts'/>)}/>
      </Routes>
      
    </Container>
    </BrowserRouter>
    
  );
}

export default App;
