import OpenColor from "open-color";
import * as React from "react";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";
import { ShareButton } from "./ShareButton";

interface IProps {
  art: IArtImage;
}

const FeedItemFooter = ({ art }: IProps) => (
  <Footer>
    <ArtTitle
      dangerouslySetInnerHTML={{
        __html: art.title
      }}
    />
    {navigator.share && (
      <ShareButton title={art.title} permalink={art.permalink} />
    )}
  </Footer>
);

const Footer = styled.footer`
  display: flex;
  padding: 1rem;
  align-items: flex-start;
`;

const ArtTitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
  padding: 0.25rem 0;
  color: ${OpenColor.gray[9]};
  flex: 1;
`;

export { FeedItemFooter, Footer, ArtTitle };
