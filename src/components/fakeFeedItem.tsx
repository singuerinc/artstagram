import * as React from "react";
import Waypoint from "react-waypoint";
import { Image } from "./image";
import { ArtImage } from "../artImage";

const FakeFeedItem = () => (
  <li className="item when-loading">
    <div className="image">
      <a className="user-header">
        <div className="avatar" />
        <h2 className="user" />
      </a>
      <div className="image-container" style={{}} />
      <h1 className="title" />
    </div>
  </li>
);

export { FakeFeedItem };
