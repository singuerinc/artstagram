import * as OpenColor from "open-color";
import * as React from "react";
import styled from "styled-components";

const Spinner = () => (
  <Loader>
    <LoaderIcon />
  </Loader>
);

const LoaderIcon = styled.div`
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: ${OpenColor.white};
  border-left-color: ${OpenColor.white};
  border-radius: 50%;

  animation: loader-spinner 800ms linear infinite;

  @keyframes loader-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Spinner };
