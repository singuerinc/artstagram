import * as React from "react";
import { Feed } from "./Feed";
import { Sorting } from "../Sorting";
import { Title } from "./feed/Title";
import { NavBar } from "./NavBar";
import { FakeFeedItem } from "./feedItem/FakeFeedItem";
import { IArtImage } from "../IArtImage";
import { FeedItem } from "./feedItem/FeedItem";
import Waypoint from "react-waypoint";

const Home = ({ match }) => {
  const { params: { sorting } } = match;

  return (
    <React.Fragment>
      <Title title={sorting} />
      <NavBar />
      <Feed sorting={sorting} urlFunc="/.netlify/functions/fetch?url=https://www.artstation.com/projects.json" />
    </React.Fragment>
  )
}

export { Home }