import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useLoaderData, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location=useLocation();
    if(loading){
        return <Loader/>
    }
    if(user){
        return children;
    }
  return (
        <Navigate to={"/register"} state={{from:location}} replace></Navigate>
  )
}

export default PrivateRoute