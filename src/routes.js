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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import ListUsers from "views/examples/ListUsers";
import Icons from "views/examples/Icons.js";
import Home from "views/examples/Home";
import Publicidad from "views/examples/Publicidad";
import Factura from "views/examples/Factura";
import Contrato from "views/examples/Contrato";
import { HomeAdmin } from "views/examples/HomeAdmin";
import  MapsUser  from "views/examples/MapsUser.js";
import Reportes from "views/examples/UserTables";
import BankFiles from "views/examples/BankFiles";
import { Facturacion } from "views/examples/Faturacion";
import Chat from "views/examples/Chat";
import ChatAdmin from "views/examples/ChatAdmin";


var routes = [  
  {
    path: "/homeadmin",
    name: "Home",
    icon: "fa fa-search text-blue",
    component: HomeAdmin,
    layout: "/admin"
  },  
  {
    path: "/index",
    name: "Reportes",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },  
  {
    path: "/user-profile",
    name: "Perfil de Usuario",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/listusers",
    name: "Lista de Usuarios",
    icon: "ni ni-bullet-list-67 text-red",
    component: ListUsers,
    layout: "/admin"
  },
  {
    path: "/faturacion",
    name: "Facturacion",
    icon: "ni ni-diamond text-green",
    component: Facturacion,
    layout: "/admin"
  },
   {
     path: "/login",
     name: "Login",
     icon: "ni ni-key-25 text-info",
     component: Login,
     layout: "/auth"
   },  
   {
     path: "/home",
     name: "Home",
     icon: "fa fa-home",
     component: Home,
     layout: "/auth"
   },
   {
     path: "/publicidad",
     name: "Publicidad",
     icon: "ni ni-folder-17 text-blue",
     component: Publicidad,
     layout: "/admin"
   },
   {
     path: "/factura",
     name: "Consultar Factura",
     icon: "fa fa-search",
     component: Factura,
     layout: "/auth"
   },
   {
     path: "/contrato",
     name: "Contrato",
     icon: "ni ni-building text-blue",
     component: Contrato,
     layout: "/admin"
   },
   {
    path: "/home",
    name: "Home",
    icon: "fa fa-home",
    component: Home,
    layout: "/auth"
   },
   {
    path: "/bankFiles",
    name: "Pagos Banco",
    icon: "ni ni-single-copy-04",
    component: BankFiles,
    layout: "/admin"
  },
  {
    path: "/factura",
    name: "Consultar Factura",
    icon: "fa fa-search",
    component: Factura,
    layout: "/admin"
  },
  {
    path: "/chat",
    name: "Consultar Factura",
    icon: "fa fa-comments",
    component: Chat,
    layout: "/auth"
  },
  {
    path: "/chat",
    name: "Gestionar Chat",
    icon: "fa fa-comments",
    component: ChatAdmin,
    layout: "/admin"
  }

];
export default routes;
