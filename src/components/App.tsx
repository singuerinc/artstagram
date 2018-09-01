import * as React from "react";
import { hashHistory } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Feed } from "./Feed";
import { UserProfile } from "./userProfile/UserProfile";

const App = () => (
  <BrowserRouter history={hashHistory}>
    <div>
      <Route exact path="/" render={() => <Redirect to="/feed/picks/" />} />
      <Route
        path="/feed/:sorting/"
        component={props => (
          <Feed
            urlFunc="/.netlify/functions/fetch?url=https://www.artstation.com/projects.json"
            sorting={props.match.params.sorting}
          />
        )}
      />
      <Route path="/user/:id" component={UserProfile} />
    </div>
  </BrowserRouter>
);

export { App };
