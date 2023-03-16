const baseURL= process.env.dev.API_URL

export const fetchWithoutToken = ( endpoint, data, method='GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;

    if ( method === 'GET' ){
        return fetch( url );
    } else {
        return fetch( url , {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

export const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';


    if ( method === 'GET' ){
        return fetch( url,{
            method,
            headers: {
                'Authorization': `Token ${ token }`
            }
        });
    } else {
        return fetch( url , {
            method,
            headers: {
                'Content-type': 'application/json',
                //'token': token
                'Authorization': `Token ${ token }`
            },
            body: JSON.stringify( data )
        });
    }

}