import './App.css';
import {Container} from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  
  return (
    <BrowserRouter>
    <Container maxWidth='lg'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/auth' Component={Auth}></Route>
      </Routes>
      
    </Container>
    </BrowserRouter>
    
  );
}

export default App;
