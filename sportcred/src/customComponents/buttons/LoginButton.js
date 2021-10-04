import React from 'react'
import { useAuth0} from "@auth0/auth0-react"




const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    const returnValue = () => {
        return (
            <button onClick={() => {
                if (!isAuthenticated) {
                    loginWithRedirect();
                }
            }}>log in</button>
        );
    }
    return returnValue()

}

export default LoginButton