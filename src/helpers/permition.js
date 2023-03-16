
export const  role = (rol) => {   
    
    if(rol === '1'){
        return "Administrador"
      }else if(rol === '2'){
        return "Cliente"
      }else if(rol === '3'){
        return "Operador"
      } else if(rol === '4'){
        return "Gerente"
      } 
}

//filtrar los datos a mostrar en la tabla

export const  datosPorRol =(datos) =>{
  
  const rol = localStorage.getItem('rol')
  const filterData= []
  if(rol === '1'){
    //Datos Administrador    
    return datos
  }else if(rol === '2'){
    //Datos del Cliente
    return ""
  }else if(rol === '3'){
    //Datos Operador
    datos.map((user) => {
      if(user.groups[0] === 2){
        filterData.push(user)
      }
    }); 
    return filterData
  } else if(rol === '4'){
    
    datos.map((user) => {
      if(user.groups[0] === 2|| user.groups[0] === 3){
        filterData.push(user)
      }
    }); 
    return filterData 
  }
}

export const  rutasPorRol =(rutas) =>{

  const rol = localStorage.getItem('rol')
  const filterRoutes= []
  if(rol === '1'){
    rutas.map((route) => { 
    if(route.path !== '/index'
      || route.path === '/contrato'
       ){
        filterRoutes.push(route)
      }   
    })  
    return filterRoutes
  }else if(rol === '2'){
    //Rutas Cliente
    rutas.map((route) => {
      if(route.path === '/homeadmin'
      || route.path === '/user-profile'
      || route.path === '/factura'
       ){
        filterRoutes.push(route)
      }
    }); 

    
    return filterRoutes
  }else if(rol === '3'){
    //Rutas operador
    
    rutas.map((route) => {
      if(route.path !== '/index' && route.path !== '/faturacion'
       //&& route.path !== '/index'
       ){
        filterRoutes.push(route)
      }
    }); 

    
    return filterRoutes
  } else if(rol === '4'){
    //Rutas gerente
    
    rutas.map((route) => {
      if(route.path !== '/contrato'
       //&& route.path !== '/index'
       ){
        filterRoutes.push(route)
      }
    });     
    return filterRoutes
    return rutas
  }     

   
  
}
