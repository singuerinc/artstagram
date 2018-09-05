import { icons } from "feather-icons";
import * as OpenColor from "open-color";
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
  color: ${OpenColor.gray[6]};
  cursor: pointer;
  transition: color 300ms;
  &:hover {
    color: ${OpenColor.gray[9]};
  }
`;

export { BackButton };
