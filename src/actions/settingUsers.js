import { fetchWithToken } from "api/fetch";
import { eventLoaded } from "views/examples/ListUsers";
import { loadClients } from "./loadClients";
import { warningUser } from "notifications/notification";
export const desactivarCliente = ( user ) => {

    warningUser(
        'Usuario Desactivado',
        `El usuario: ${user.first_name} \n ${user.last_name} con ID: ${user.id} ha sido Desactivado`,
        'success')
    
    return async(dispatch) =>{

        try{
        const response = await fetchWithToken( 
                                    `users/${ user.id }/`,
                                    {
                                        email: user.description,
                                        phone_number:user.phone_number,
                                        identification_number: user.identification_number,
                                        groups: user.grpups
                                        //username:user.username                                   
                                    }, 
                                    'DELETE' );
        
        const body = await response.json();  
               
        if ( response.ok){
            warningUser("CLIENTE DESACTIVADO CON EXITO"," ",'success');
            dispatch( eventLoaded( await loadClients() ) ); 
            document.getElementById("buttonUpdate").click();  
           // notification("Felicidades",body.message,'success');
            
        
        }else{           
            //warningUser("ERROR",body.error.description,'error');
        
        }
    }catch{
        //warningUser("ERROR","",'error');
    }

    }
}
export const editUser = async (values) => {

    
    
    const response = await fetchWithToken( 
        
        `users/${values.id}/`, 
            { 
                first_name:values.first_name,
                last_name: values.last_name,
                email:values.email,
                phone_number:values.phone_number    
            }, 
            'PUT' 
    );
    
    
    const body = await response.json()  
    
    console.log(body[1])
   if(response.ok){
    warningUser(
        'Actualización Exitosa',
        `El usuario: ${values.first_name} \n ${values.last_name} con ID: ${values.id} ha sido actualizado`,
        'success')
   }else{
    warningUser(
        'Datos Erroneos',
        `Usuario: ${values.first_name} \n ${values.last_name} con ID: ${values.id} no actualizado`,
        'error')
   }

    
//    console.log(values + "  " + values[0].first_name)

}



export const activarCliente = ( user ) => {
      
    
    return async(dispatch) =>{

        const response = await fetchWithToken( 
                                    `users/${ user.id }/`,
                                    {
                                        is_active: true                                   
                                    }, 
                                    'PUT' );
        
        const body = await response.json();
        console.log(response)
        if(response.ok){
            
            dispatch( eventLoaded( await loadClients() ) );       
                
            document.getElementById("buttonUpdate").click();   
                      

        }                    
            
        
       

    }
}