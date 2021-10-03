
import { useAuth0 } from "@auth0/auth0-react";
// require('dotenv').config();

////////////////////////////////////////////////
// TODO: Why is it not working ?????
////////////////////////////////////////////////

export const SERVER_ROOT = "http://localhost:5000";
// export const SERVER_ROOT = process.env.SERVER_ROOT + ":" + process.env.SERVER_PORT;
// console.log("urls: ", SERVER_ROOT);

export const DEFAULT_HEADER = () => {
    return {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "auth-token": "jsonwebtoken",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
};

// export const DEFAULT_HEADER = {}

// Prod

export const HOME_URL = "/";

export const PROFILE_URL = "/profile";
export const EDIT_PROFILE_URL = "/edit-profile";

export const SIGNIN_URL = "/signin";
export const SIGNUP_URL = "/signup";
export const TRIVIA_LANDING_URL = "/trivia";
export const TRIVIA_SINGLE_PLAYER_URL = "/trivia-single-player";

export const DEBATE_LANDING_URL = "/debate";
export const ZONE_LANDING_URL = "/zone";
export const PICKSPREDICT_LANDING_URL = "/picks-and-predict";

export const REGULAR_SEASON_URL = PICKSPREDICT_LANDING_URL + '/regular-season';
export const PLAYOFFS_BRACKET_URL = PICKSPREDICT_LANDING_URL + '/playoffs-bracket';
export const PRESEASON_URL =  PICKSPREDICT_LANDING_URL + '/preseason';

// Dev
export const COMPONENTS_URL = "/components"