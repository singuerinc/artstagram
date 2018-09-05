import OpenColor from "open-color";
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
  background-color: ${OpenColor.gray[9]};
  opacity: 0.98;
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
  color: ${OpenColor.gray[3]};
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
`;

export { MatureContentLayer };
