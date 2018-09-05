import * as OpenColor from "open-color";
import * as React from "react";
import styled from "styled-components";
import { Sorting } from "../../Sorting";

interface IProps {
  title: string;
}

export const communitify = (x: string) =>
  x === Sorting.COMMUNITY ? "community" : x;

const Title = ({ title }: IProps) => (
  <StyledTitle>{communitify(title)}</StyledTitle>
);

const StyledTitle = styled.h3`
  margin: 0;
  padding: 1rem;
  background-color: ${OpenColor.white};
  font-weight: 500;
  text-transform: capitalize;

  @media only screen and (min-width: 48rem) {
    display: none;
  }
`;

export { Title };
