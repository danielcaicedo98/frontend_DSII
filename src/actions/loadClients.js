

import { fetchWithToken } from "api/fetch";

export const loadClients = async() => {
    const response = await fetchWithToken('users/');
    const body = await response.json();
    const users = {}   
    const data = [];    
    
    body.forEach(user => {
        data.push({
            id: user.id,
            first_name:user.first_name,
            last_name: user.last_name,
            email:user.email,
            phone_number: user.phone_number,
            is_active:user.is_active
        });
    });
    
    
    users.data = data;   
    return data;    
}
