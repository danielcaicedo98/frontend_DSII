/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { BrowserRouter, Redirect, Route} from "react-router-dom";


import "assets/css/styles.css";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import Login from "views/examples/Login.js";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { PrivateRoute } from "routers/PrivateRoute";
import { useSelector } from "react-redux";
import { createModuleResolutionCache } from "typescript";
import { ModalMap } from "views/examples/ModalMaps";
import MapsUser from "views/examples/MapsUser";
import Maps from "views/examples/Maps";



const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth)
  
  
    return <>
    {//isAuth ? <Outlet /> : <Navigate to='/Login' />
    }
    </>
  
  }

 function App(){
    const { isAuth } = useSelector((state) => state.auth)

  //const { isAuth } = localStorage.getItem('isAut') 
  
     return(  
      <BrowserRouter>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />                    
          {
            isAuth ? <Route  path="/admin" component={AdminLayout}/> : <Redirect to='/auth/home' />
          }   
      </BrowserRouter>
    );
  }

export default App;