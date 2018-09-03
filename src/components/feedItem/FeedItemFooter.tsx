import * as React from "react";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";
import { ShareButton } from "./ShareButton";

interface IProps {
  art: IArtImage;
}

const FeedItemFooter = ({ art }: IProps) => (
  <Footer>
    <ArtTitle dangerouslySetInnerHTML={{
      __html: art.title
    }} />
    {navigator.share && <ShareButton art={art} />}
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
  color: lightslategray;
  flex: 1;
`;

export { FeedItemFooter, Footer, ArtTitle };
