import { hashHistory } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import * as React from "react";
import { Feed } from "./feed";
import { UserProfile } from "./userProfile";

const App = () => (
  <BrowserRouter history={hashHistory}>
    <div>
      <Route exact path="/" render={() => <Redirect to="/feed/latest" />} />
      <Route path="/feed/:sorting" component={Feed} />
      <Route path="/user/:id" component={UserProfile} />
    </div>
  </BrowserRouter>
);

export { App };
