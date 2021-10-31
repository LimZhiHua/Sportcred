// Defaults ----------------------------------------------------------------

export let SERVER_ROOT = process.env.REACT_APP_SERVER_DOMAIN
if (process.env.REACT_APP_SERVER_PORT !== "*") {
    SERVER_ROOT+=":"+process.env.REACT_APP_SERVER_PORT;
}

export const DEFAULT_HEADER = () => {
    return {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "auth-token": "jsonwebtoken",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
};

// Prod ----------------------------------------------------------------

export const HOME_URL = "/";

export const PROFILE_URL = "/profile";
export const EDIT_PROFILE_URL = "/edit-profile";

export const SIGNIN_URL = "/signin";
export const SIGNUP_URL = "/signup";
export const TRIVIA_LANDING_URL = "/trivia";
export const TRIVIA_SINGLE_PLAYER_URL = "/trivia-single-player";

export const ANALYSIS_LANDING_URL = "/analysis";
export const ANALYSIS_ANSWER_URL = "/analysis-answer";
export const ANALYSIS_RATING_URL = "/analysis-rating";
export const ANALYSIS_HISTORY_URL = "/analysis-history";

export const ZONE_LANDING_URL = "/zone";
export const PICKSPREDICT_LANDING_URL = "/picks-and-predict";

export const REGULAR_SEASON_URL = PICKSPREDICT_LANDING_URL + '/regular-season';
export const PLAYOFFS_BRACKET_URL = PICKSPREDICT_LANDING_URL + '/playoffs-bracket';
export const PRESEASON_URL =  PICKSPREDICT_LANDING_URL + '/preseason';

// Dev ----------------------------------------------------------------

export const DEV_HOME_URL = "/dev"