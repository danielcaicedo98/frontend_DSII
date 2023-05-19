import { fetchWithoutToken,fetchWithToken } from "api/fetch"; 

import { types } from "types/types";
import { warningUser } from "notifications/notification";
import { authenticateUser } from "reducers/authSlice";

export const startLogin = (email, password) => {
    return async( dispatch ) => {
        
        
        const response = await fetchWithoutToken( 
                                'users/login/', 
                                { email, password }, 
                                'POST' 
                            );
        const body = await response.json();
        

        if ( response.status === 200 ||  response.status === 201 ){

            // GUARDAR EN EL LOCAL STORAGE INFORMACION DE USUARIO
            dispatch(authenticateUser())
            localStorage.setItem('isAuth','true'); 
            localStorage.setItem('token',body.token.access);
            localStorage.setItem('email',body.user.email);            
            localStorage.setItem('rol',body.user.groups);
            localStorage.setItem('first_name',body.user.first_name);
            localStorage.setItem('last_name',body.user.last_name);
            localStorage.setItem('identification_number',body.user.identification_number);
            localStorage.setItem('identification_type',body.user.identification_type);
            localStorage.setItem('birth_date',body.user.birth_date);
            let name = `${body.user.first_name}  ${body.user.last_name}`            
            localStorage.setItem('username',name);

            dispatch( login({
                token: body.token,
                username: name
            }) );

            
           
        }else{
            warningUser("Datos incorrectos", body.detail[0],'error')
        }

    }
}

const login = ( user ) => ({
    type: types.login,
    payload: user
})


const checkingFinish = () => ({ type: types.authCheckingFinish })