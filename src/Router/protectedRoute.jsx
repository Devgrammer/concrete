import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import { getAuth } from "firebase/auth";

const auth = getAuth();

const user = auth.currentUser;
const ProtectedRoute = ({auth, children, element: Component, ...restProps}) => {
    const [authToken, setAuthtoken] = useState(localStorage.getItem('token'));
    


   
if(authToken){
    return children
} else{
    return <Navigate to={ '/login' } />
}



};

export default ProtectedRoute
