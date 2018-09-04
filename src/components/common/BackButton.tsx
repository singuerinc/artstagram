import { icons } from "feather-icons";
import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BackButton = ({ onClick }) => (
  <Wrapper to="" onClick={onClick}>
    <div
      dangerouslySetInnerHTML={{
        __html: icons.x.toSvg()
      }}
    />
  </Wrapper>
);

const Wrapper = styled(NavLink)`
  align-self: flex-start;
  padding: 16px;
  color: gray;
  cursor: pointer;
  transition: color 300ms;
  &:hover {
    color: black;
  }
`;

export { BackButton };
