import React from 'react'
import  Home from '../pages/home.jsx';
import { Routes, Route, } from "react-router-dom";
import Hero from '../components/Hero/hero.jsx';
import Cart from '../pages/Cart/cart.jsx';
import Wishlist from '../pages/wishlist/wishlist.jsx';
import Display from '../pages/Display/display.jsx';
import Login from '../pages/login/login.jsx';
import Signup from '../pages/signup/signup.jsx';
import ProtectedRoute from './protectedRoute.jsx';
import { auth } from '../firebase.js';
import { getAuth } from 'firebase/auth';








 const Routing = (
     <Routes>
         <Route exact path="/" element={ <Display /> } />
         <Route path="/products" element={ <ProtectedRoute auth={auth}><Home /></ProtectedRoute> }/>
         <Route path="/cart" element={ <ProtectedRoute auth={ auth }><Cart /></ProtectedRoute> } />
         <Route path="/wishlist" element={ <ProtectedRoute auth={ auth }><Wishlist /></ProtectedRoute>  } />
         <Route  path="/login"  element={ <Login/> } />
         <Route  path="/signup"  element={ <Signup/> } />
     </Routes>
);

export default  Routing
