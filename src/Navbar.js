import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLeft, AiOutlineSetting } from "react-icons/ai";
import { Button } from 'reactstrap';
import { isOnRoute, getThisRoute } from './utils';
import { useAuth0} from "@auth0/auth0-react"

import {
    HOME_URL,
    PROFILE_URL,
    SIGNIN_URL,
    // SIGNUP_URL,
    TRIVIA_LANDING_URL,
    DEBATE_LANDING_URL,
    PICKSPREDICT_LANDING_URL,
    ANALYSIS_LANDING_URL
  } from "./urls";

function activeOnRoute(route) {
    return (isOnRoute(route)) ? "active" : "";
}

let Navlink = (props) => {
    return <Link to={props.to}><div className={"menu-item " + activeOnRoute(props.to)}>{props.children}</div></Link>;
}


let Navbar = () => {
    const [opened, setOpened] = useState(false)
    const [thisRoute, setThisRoute] = useState(getThisRoute());
    const {logout, isAuthenticated} = useAuth0();

    // Force navbar to repaint when route is changed
    useEffect(() => {
        window.addEventListener("hashchange", () => {
            setThisRoute(getThisRoute());
            // Auto close navbar panel on mobile view
            if (window.innerWidth < 600) {
              setOpened(false);
            }
        });
    }, [setThisRoute, setOpened]);

    const Logout = () =>{
      sessionStorage.removeItem('token');
      if (isAuthenticated) {
          logout();
      }
    }

    return (
      <div id="navbar" key={thisRoute} className={((opened)? "opened":"")}>
        <div className={"body flex-container flex-vertical"}>
          <div className="flex-primary">
            {/* <h1>SportsCred</h1> */}
            <Link to={HOME_URL}>
              <img src="Logo.png" className="App-logo" alt=""></img>
            </Link>
            <div>
              <Navlink to={HOME_URL}>Open Court</Navlink>
              <Navlink to={TRIVIA_LANDING_URL}>Trivia</Navlink>
              <Navlink to={ANALYSIS_LANDING_URL}>Analysis</Navlink>
              <Navlink to={PICKSPREDICT_LANDING_URL}>Picks and Predictions</Navlink>
            </div>
          </div>
          <div>
            <Navlink to={PROFILE_URL}><AiOutlineSetting/> Profile</Navlink>
            {(isAuthenticated)
              ? <div className="menu-item" onClick={Logout}>Logout</div>
              : <Navlink to={SIGNIN_URL}>Login</Navlink>}
            <div className="menu-item spacer"></div>
          </div>
        </div>
        <Button className={"burger-btn outline center-center"}
                color="secondary"
                onClick={() => setOpened(!opened)}>
          {(opened === false) ? <AiOutlineMenu color="white"/> : <AiOutlineLeft color="white"/>}
        </Button>
      </div>
    )
}

export default Navbar;