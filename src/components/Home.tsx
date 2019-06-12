import * as React from "react";
import styled from "styled-components";
import { Sorting } from "../Sorting";
import { Feed } from "./Feed";
import { Title } from "./feed/Title";
import { NavBar } from "./NavBar";

interface IProps {
  sorting: Sorting;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 48rem) {
    > nav {
      order: 1;
    }

    > h3 {
      order: 2;
    }

    > ul {
      order: 3;
    }
  }
`;

const Home = ({ sorting }: IProps) => (
  <Wrapper>
    <Title title={sorting} />
    <Feed urlFunc={`/.netlify/functions/projects?sorting=${sorting}`} />
    <NavBar />
  </Wrapper>
);

export { Home };
