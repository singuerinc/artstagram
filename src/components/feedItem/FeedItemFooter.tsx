import * as React from "react";
import styled from "styled-components";
import { ArtImage } from "../../artImage";
import { ShareButton } from "./ShareButton";

type Props = {
  art: ArtImage;
};

const FeedItemFooter = ({ art }: Props) => (
  <Wrapper>
    <h1 className="title">{art.title}</h1>
    {navigator.share && <ShareButton art={art} />}
  </Wrapper>
);

const Wrapper = styled.footer`
  display: flex;
  padding: 1rem;
  align-items: center;
`;

export { FeedItemFooter };
