import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLeft, AiOutlineSetting } from "react-icons/ai";
import { Button } from 'reactstrap';
import { isOnRoute, getThisRoute } from './utils';

import {
    HOME_URL,
    PROFILE_URL,
    // SIGNIN_URL,
    // SIGNUP_URL,
    TRIVIA_LANDING_URL,
    DEBATE_LANDING_URL,
    ZONE_LANDING_URL,
    PICKSPREDICT_LANDING_URL,
    COMPONENTS_URL
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

    // Force navbar to repaint when route is changed
    useEffect(() => {
        window.addEventListener("hashchange", () => {
            setThisRoute(getThisRoute());
        });
    }, [setThisRoute]);
    
    return (
      <div id="navbar" key={thisRoute} className={((opened)? "opened":"")}>
        <div className={"body flex-container flex-vertical"}>
          <div className="flex-primary">
            {/* <h1>SportsCred</h1> */}
            <Link to={HOME_URL}>
              <img src="Logo.png" className="App-logo" alt=""></img>
            </Link>
            <div>
              <Navlink to={PROFILE_URL}>Profile</Navlink>
              <Navlink to={ZONE_LANDING_URL}>Open Court</Navlink>
              <Navlink to={TRIVIA_LANDING_URL}>Trivia</Navlink>
              <Navlink to={DEBATE_LANDING_URL}>Debates</Navlink>
              <Navlink to={PICKSPREDICT_LANDING_URL}>Picks and Predictions</Navlink>
            </div>
          </div>
          <div>
            <div className="menu-item"><Link to="/"><AiOutlineSetting/></Link><Link to={COMPONENTS_URL}> Components (TEMP)</Link></div>
            <Navlink to={HOME_URL}>Logout</Navlink>
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