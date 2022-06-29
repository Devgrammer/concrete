import React, { useEffect, useState } from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { getProductData } from './Redux/slice/productData'
import NavBar from './components/Navbar/navbar';
import Home from './pages/home.jsx';
import Cart from './components/Cart/cart.jsx'
import Routing from './Router/router'
import Footer from './components/footer/footer';
import {auth} from './firebase'



function App() {
const [userName, setUserName] = useState(' ')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductData());
  }, [])
  useEffect(() => {
   
    auth.onAuthStateChanged(user=>{
      if (user) {  
        setUserName(user?.displayName);
      }else{
        setUserName('')
      }
      console.log(user)})
  }, [])


  return (

    <div className="container">
      <NavBar userName={userName} />
      {Routing}
      <Footer/>
    </div>


  );
}

export default App;
