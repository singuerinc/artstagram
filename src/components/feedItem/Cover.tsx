import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { openLargeImage } from "./cover.utils";

export interface IProps {
  title: string;
  smallImageUrl: string;
  src: string | null;
  onLoad: () => void;
}

function Cover({ onLoad: onLoadCover, title, smallImageUrl, src }: IProps) {
  const [loaded, setLoaded] = useState(false);

  function onLoad() {
    setLoaded(true);
    onLoadCover();
  }

  return (
    <StyledImage
      onLoad={onLoad}
      loaded={loaded}
      src={src}
      title={title}
      alt={title}
      onClick={openLargeImage(smallImageUrl)}
    />
  );
}

const StyledImage = styled.img`
  width: 100%;
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  opacity: ${({ loaded }: { loaded: boolean }) => (loaded ? 1 : 0)};
  transition: opacity 0.3s;
  transition-delay: 0.3s;
  cursor: pointer;
`;

export { Cover };
