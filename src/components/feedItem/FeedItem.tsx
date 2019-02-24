import * as OpenColor from "open-color";
import * as React from "react";
import { useRef, useState } from "react";
import Waypoint from "react-waypoint";
import styled from "styled-components";
import { IArtImage, IUser } from "../../IArtImage";
import { Image } from "../Image";
import { FeedItemFooter } from "./FeedItemFooter";
import { FeedItemHeader } from "./FeedItemHeader";

interface IProps {
  art: IArtImage;
  user: IUser;
}

function FeedItem({ art, user }: IProps) {
  const [src, setSrc] = useState<string>("");
  const { id, cover } = art;
  const ref = useRef<HTMLLIElement>(null);

  return (
    <FeedItemContainer key={id} ref={ref}>
      <FeedItemHeader art={art} user={user} />
      <Waypoint
        key={id}
        scrollableAncestor={window}
        bottomOffset={-500}
        onEnter={() => {
          if (src === null) {
            setSrc(cover.small_square_url);
          }
        }}
      >
        <Image art={art} src={src} />
      </Waypoint>
      <FeedItemFooter art={art} />
    </FeedItemContainer>
  );
}

const FeedItemContainer = styled.li`
  width: 100%;
  background-color: ${OpenColor.white};
  color: black;
  margin: 1rem 0;
  position: relative;

  @media only screen and (min-width: 48rem) {
    box-shadow: 0 0 3em ${OpenColor.gray[3]};
    border: 1px solid ${OpenColor.gray[3]};
    border-radius: 3px;

    &:first-child {
      margin: 0 0 1rem;
    }
  }
`;

export { FeedItem, FeedItemContainer };
