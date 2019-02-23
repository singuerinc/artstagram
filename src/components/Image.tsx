import * as OpenColor from "open-color";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { IArtImage } from "../IArtImage";
import { Spinner } from "./common/Spinner";
import { Cover } from "./feedItem/Cover";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";

interface IProps {
  innerRef?: any;
  art: IArtImage;
  src: string | null;
}

function Image({
  innerRef,
  art: { adult_content, cover, title },
  src
}: IProps) {
  const [loaded, setLoaded] = useState(false);
  const [mature, setMature] = useState(adult_content);

  const hideMatureLayer = () => setMature(false);
  const onLoad = () => setLoaded(true);

  // TODO: use Ruspenders

  return (
    <div ref={innerRef}>
      <ImageContainer>
        {!loaded && <Spinner />}
        {mature && <MatureContentLayer onClose={hideMatureLayer} />}
        <Cover
          onLoad={onLoad}
          src={src}
          title={title}
          smallImageUrl={cover.small_square_url}
        />
      </ImageContainer>
    </div>
  );
}

const ImageContainer = styled.div`
  position: relative;
  background-color: ${OpenColor.gray[1]};
  padding-top: 100%;
`;

export { Image, ImageContainer, IProps };
