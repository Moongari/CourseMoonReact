import React,{FunctionComponent, useState} from 'react'; 
import { Route, Redirect, Link } from 'react-router-dom';
import AuthenticationService from './services/authentication-service';
const logOut :FunctionComponent= () => {
  
    const isAuthenticated = AuthenticationService.isAuthenticated;
  
 const isLogin = ()=>{
   
 }

    return(
        <div className="center">

             
               
        </div>
     

    );
 

}

   
    
  export default logOut;