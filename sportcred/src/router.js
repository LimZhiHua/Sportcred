import React from "react";
import { 
  Switch, 
  Route, 
  // Redirect 
} from "react-router-dom";


import {
  HOME_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  TRIVIA_LANDING_URL,
  DEBATE_LANDING_URL,
  ZONE_LANDING_URL,
  PICKSPREDICT_LANDING_URL,
  COMPONENTS_URL
} from "./urls";

import Homepage from "./pages/Homepage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TriviaLanding from "./pages/TriviaLanding";
import DebateLanding from "./pages/DebateLanding";
import ZoneLanding from "./pages/ZoneLanding";
import PicksPredictLanding from "./pages/PicksPredictLanding";

import ComponentPage from "./devPages/componentsPage";

const AppRouter = () => (
  <Switch>
    {/* Prod */}
    <Route exact path={SIGNIN_URL} component={Signin} />
    <Route exact path={SIGNUP_URL} component={Signup} />
    <Route exact path={HOME_URL} component={Homepage} />
    <Route exact path={TRIVIA_LANDING_URL} component={TriviaLanding} />
    <Route exact path={DEBATE_LANDING_URL} component={DebateLanding} />
    <Route exact path={ZONE_LANDING_URL} component={ZoneLanding} />
    <Route exact path={PICKSPREDICT_LANDING_URL} component={PicksPredictLanding} />
    {/* Dev */}
    <Route exact path={COMPONENTS_URL} component={ComponentPage} />
  </Switch>
);

export default AppRouter;
