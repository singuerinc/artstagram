import * as React from "react";
import styled from "styled-components";

interface IProps {
  onClose: () => void;
}

const MatureContentLayer = ({ onClose }: IProps) => (
  <Wrapper onClick={onClose}>
    <ClickToViewText>
      Mature content
      <br />
      Click to view
    </ClickToViewText>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClickToViewText = styled.span`
  display: block;
  color: gray;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
`;

export { MatureContentLayer };
