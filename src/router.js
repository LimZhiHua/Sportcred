import React from "react";
import {
  Switch,
  Route,
  // Redirect
} from "react-router-dom";


import {
  HOME_URL,
  PROFILE_URL,
  EDIT_PROFILE_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  TRIVIA_LANDING_URL,
  TRIVIA_SINGLE_PLAYER_URL,
  ANALYSIS_LANDING_URL,
  ANALYSIS_ANSWER_URL,
  ANALYSIS_RATING_URL,
  ANALYSIS_HISTORY_URL,
  ZONE_LANDING_URL,
  PICKSPREDICT_LANDING_URL,
  REGULAR_SEASON_URL,
  PRESEASON_URL,
  PLAYOFFS_BRACKET_URL,
  DEV_HOME_URL
} from "./urls";

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TriviaLanding from "./pages/TriviaLanding";
import TriviaSinglePlayer from "./pages/TriviaSinglePlayer";

import DebateLanding from "./pages/DebateLanding";
import AnalysisAnswer from "./pages/AnalysisAnswer";
import AnalysisRate from "./pages/AnalysisRate";
import AnalysisHistory from "./pages/AnalysisHistory.js";
import ZoneLanding from "./pages/ZoneLanding";
import PicksPredictLanding from "./pages/PicksPredictLanding";
import RegularSeason from "./pages/PicksPredictionPages/RegularSeason";
import PlayOffBrackets from "./pages/PicksPredictionPages/PlayOffBrackets";
import PreSeason from "./pages/PicksPredictionPages/PreSeason";

import DevHomePage from "./devPages/devHome";

import { withAuthenticationRequired} from "@auth0/auth0-react"
import Loading from "../src/pages/Loading"

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);


const AppRouter = () => (
  <Switch>
    {/* Prod */}
    <Route exact path={SIGNIN_URL} component={Signin} />
    <Route exact path={SIGNUP_URL} component={Signup} />
    <ProtectedRoute exact path={PROFILE_URL} component={Profile} />
    <ProtectedRoute exact path={EDIT_PROFILE_URL} component={EditProfile} />

    <ProtectedRoute exact path={HOME_URL} component={Homepage} />
    <ProtectedRoute exact path={TRIVIA_LANDING_URL} component={TriviaLanding} />
    <ProtectedRoute exact path={TRIVIA_SINGLE_PLAYER_URL} component={TriviaSinglePlayer} />

    <ProtectedRoute exact path={ANALYSIS_LANDING_URL} component={DebateLanding} />
    <ProtectedRoute exact path={ANALYSIS_ANSWER_URL} component={AnalysisAnswer} />
    <ProtectedRoute exact path={ANALYSIS_RATING_URL} component={AnalysisRate} />
    <ProtectedRoute exact path={ANALYSIS_HISTORY_URL} component={AnalysisHistory} />

    <ProtectedRoute exact path={ZONE_LANDING_URL} component={ZoneLanding} />
    <ProtectedRoute exact path={PICKSPREDICT_LANDING_URL} component={PicksPredictLanding} />
    <ProtectedRoute exact path={REGULAR_SEASON_URL} component={RegularSeason} />
    <ProtectedRoute exact path={PRESEASON_URL} component={PreSeason} />
    <ProtectedRoute exact path={PLAYOFFS_BRACKET_URL} component={PlayOffBrackets} />

    {/* Dev */}
    <Route exact path={DEV_HOME_URL} component={DevHomePage} />
  </Switch>
);

export default AppRouter;
