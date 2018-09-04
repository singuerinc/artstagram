import * as React from "react";
import { hashHistory } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Sorting } from "../Sorting";
import { Home } from "./Home";
import { UserProfile } from "./userProfile/UserProfile";

const App = () => (
  <BrowserRouter history={hashHistory}>
    <div>
      <Redirect from="/" to="/feed/picks/" />
      <Route
        path="/feed/picks/"
        component={() => <Home sorting={Sorting.PICKS} />}
      />
      <Route
        path="/feed/latest/"
        component={() => <Home sorting={Sorting.LATEST} />}
      />
      <Route
        path="/feed/trending/"
        component={() => <Home sorting={Sorting.TRENDING} />}
      />
      <Route
        path="/feed/randomize/"
        component={() => <Home sorting={Sorting.COMMUNITY} />}
      />
      <Route path="/user/:id" component={UserProfile} />
    </div>
  </BrowserRouter>
);

export { App };
