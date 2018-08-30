import { icons } from "feather-icons";
import * as React from "react";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";

const ShareButtonAsset = styled.a`
  display: block;
  margin-left: auto;
  color: lightgrey;
  cursor: pointer;
  transition: color 300ms;

  &:hover {
    color: grey;
  }
`;

interface IProps {
  art: IArtImage;
}

const share = ({ title, permalink: url }: IArtImage) => async () => {
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

const ShareButton = ({ art }: IProps) => (
  <ShareButtonAsset
    onClick={share(art)}
    dangerouslySetInnerHTML={{
      __html: icons["share-2"].toSvg()
    }}
  />
);

export { ShareButton };
