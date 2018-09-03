import * as React from "react";
import { Feed } from "./Feed";
import { Title } from "./feed/Title";
import { NavBar } from "./NavBar";

const Home = ({ match }) => {
  const { params: { sorting } } = match;

  return (
    <React.Fragment>
      <Title title={sorting} />
      <NavBar />
      <Feed sorting={sorting} urlFunc="/.netlify/functions/projects?a=1" />
    </React.Fragment>
  )
}

export { Home }