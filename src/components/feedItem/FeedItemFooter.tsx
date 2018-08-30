import * as React from "react";
import styled from "styled-components";
import { ArtImage } from "../../artImage";
import { ShareButton } from "./ShareButton";

type Props = {
  art: ArtImage;
};

const FeedItemFooter = ({ art }: Props) => (
  <Footer>
    <ArtTitle>{art.title}</ArtTitle>
    {navigator.share && <ShareButton art={art} />}
  </Footer>
);

const Footer = styled.footer`
  display: flex;
  padding: 1rem;
  align-items: center;
`;

const ArtTitle = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
  color: lightslategray;
`;

export { FeedItemFooter, Footer, ArtTitle };
