import React from "react";
import { Switch } from "react-router-dom";

import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Components/Home";
import { Route } from "react-router-dom";
function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" exact>
        <LoginScreen />
      </ProtectedRoute>
      <ProtectedRoute path="/home" exact>
        <Home />
      </ProtectedRoute>
      <ProtectedRoute path="/forgotpassword">
        <ForgotPassword />
      </ProtectedRoute>
      <Route path="/signup">
        <SignUpScreen />
      </Route>
      <Route path="/resetpassword">
        <ResetPassword />
      </Route>
      <ProtectedRoute path="*" exact>
        <LoginScreen />
      </ProtectedRoute>
    </Switch>
  );
}

export default Router;
