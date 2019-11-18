
import axios from 'axios';

const API_URL = 'http://localhost:5000';
export default { 
    isAuthenticated: () => {
        //here will check if the client has saved token on storage
        //the content token will only be used to send in HEADER of request

        //the authorization level will be saved in the database
        //when the token reaches the server, 
        //it should look for the user id and see if it has access to the desired content.

        const token = localStorage.getItem("keyToken");   

        let isAuth = false;
        if (token !== null && token !== undefined) {
            if(token.trim().length > 0) {
                isAuth = true;
            } else {
                isAuth = false;
            }
        }

        return isAuth;
        
    },
  
    tryLogin: ( data = {} ) => {   
        var isOk = false;
        return axios
        .post(API_URL + '/api/login', data)
        .then(response => {  
            if(response.status == 200) {                     
                if(response.data.token.trim().length > 0) {  
                    localStorage.setItem("keyToken", response.data.token);                        
                    return true;                                  
                } else {
                    return false;
                }                                                                                
            }                      
        })
        .catch(error => {            
            console.error(error);
        });        

        //return isOk;
    }
  
}