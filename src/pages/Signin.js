import React from "react";
import FloatingSection from "../customComponents/FloatingSection";
import {useAuth0} from "@auth0/auth0-react"
import LoginButton from '../customComponents/buttons/LoginButton';
import LogoutButton from '../customComponents/buttons/LogoutButton';



const Signin = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        getAccessTokenSilently().then((value) => sessionStorage.setItem('token', value));
    } 

    return (
        <div>
                <FloatingSection>
                    {(isAuthenticated) 
                        ? <LogoutButton/>
                        : <LoginButton/>}
                </FloatingSection>
        </div>
    );
}

export default Signin;