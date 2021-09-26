import React from 'react'
import { useAuth0} from "@auth0/auth0-react"

const LogoutButton =() =>{
    const {logout, isAuthenticated} = useAuth0();

    
    const returnValue = ()=>{
        let retVal = null;
        if( isAuthenticated){
             retVal =    <button onClick={() => logout()}> Log out</button>  
        }
        return retVal
    }
    return  returnValue()


}

export default LogoutButton