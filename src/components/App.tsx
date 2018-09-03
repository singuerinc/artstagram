import * as React from "react";
import { hashHistory } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Home } from "./Home";
import { UserProfile } from "./userProfile/UserProfile";

const App = () => (
  <BrowserRouter history={hashHistory}>
    <div>
      <Route exact path="/" render={() => <Redirect to="/feed/picks/" />} />
      <Route
        path="/feed/:sorting/"
        component={Home}
      />
      <Route path="/user/:id" component={UserProfile} />
    </div>
  </BrowserRouter>
);

export { App };
