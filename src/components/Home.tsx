import * as React from "react";
import { Feed } from "./Feed";
import { Title } from "./feed/Title";
import { NavBar } from "./NavBar";
import { Sorting } from "../Sorting";

interface IProps {
  sorting: Sorting;
}

const Home = ({ sorting }: IProps) => (
  <React.Fragment>
    <Title title={sorting} />
    <NavBar />
    <Feed urlFunc={`/.netlify/functions/projects?sorting=${sorting}`} />
  </React.Fragment>
)

export { Home }