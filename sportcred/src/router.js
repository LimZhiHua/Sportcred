import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";


import {
  HOME_URL,
  SIGNIN_URL,
  SIGNUP_URL
} from "./urls";

import Homepage from "./pages/Homepage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const AppRouter = () => (
  <Switch>
    {/* TODO: */}
    <Route exact path={SIGNIN_URL} component={Signin} />
    <Route exact path={SIGNUP_URL} component={Signup} />
    <Route exact path={HOME_URL} component={Homepage} />
  </Switch>
);

export default AppRouter;
