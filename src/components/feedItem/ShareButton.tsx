import { icons } from "feather-icons";
import * as React from "react";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";

interface IProps {
  title: string;
  permalink: string;
}

const share = ({ title, permalink: url }: IProps) => async () => {
  // native share: only Android
  // @ts-ignore
  if (navigator.share) {
    navigator
      // @ts-ignore
      .share({
        text: "",
        title,
        url
      })
      .then(() => {
        //
      })
      .catch(error => {
        //
      });
  }
};

const ShareButton = ({ title, permalink: url }: IProps) => (
  <ShareButtonAsset
    onClick={share({ title, permalink: url })}
    dangerouslySetInnerHTML={{
      __html: icons["share-2"].toSvg()
    }}
  />
);

const ShareButtonAsset = styled.a`
  display: block;
  margin-left: 1rem;
  color: lightgrey;
  cursor: pointer;
  transition: color 300ms;

  &:hover {
    color: grey;
  }
`;

export { ShareButton };
