import * as React from "react";
import styled from "styled-components";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.h3`
  margin: 0;
  padding: 1rem;
  background-color: #fff;
  font-weight: 500;
  text-transform: capitalize;

  @media only screen and (min-width: 48rem) {
    display: none;
  }
`;

export { Title };
