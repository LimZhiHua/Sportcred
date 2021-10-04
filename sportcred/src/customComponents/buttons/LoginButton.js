import React from 'react'
import { useAuth0} from "@auth0/auth0-react"




const LoginButton =() =>{
    const {loginWithRedirect, isAuthenticated} = useAuth0();


    const returnValue = ()=>{
        let retVal = null
        if(! isAuthenticated){
            retVal =  <button onClick={() => loginWithRedirect()}> log in</button>
        }

        return retVal;
    }
    return returnValue()

}

export default LoginButton