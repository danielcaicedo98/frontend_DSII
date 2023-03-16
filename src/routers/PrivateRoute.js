import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startChecking } from 'actions/auth';
let isAuthenticated = false


export const PrivateRoute = ({token,component: Component, ...rest}) => {

    
    const dispatch = useDispatch();
   
  
 
    return (
        <Route {...rest}>
          {
            (!!token) ? (props) => <Component{...props}/>:<Redirect to = '/auth/login'/>          
          }
        </Route>
    )
}


