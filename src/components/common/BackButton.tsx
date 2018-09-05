import * as OpenColor from "open-color";
import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <Wrapper to="" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
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
