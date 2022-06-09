import React from 'react';
import { BrowserRouter, Route, Routes as RouteProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { Container } from './styles';


function Routes() {
  return(
    <Container>
      <BrowserRouter>
        <RouteProvider>
          <Route path='/' exact element={<Login/>}/>
          <Route path='/home' exact element={<Home/>}/>
        </RouteProvider>
      </BrowserRouter>
    </Container>
  );
}

export default Routes;