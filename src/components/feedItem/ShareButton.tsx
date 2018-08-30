import * as React from "react";
import { icons } from "feather-icons";
import styled from "styled-components";
import { ArtImage } from "../../artImage";

const ShareButtonAsset = styled.a`
  display: block;
  margin-left: auto;
  color: lightgrey;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

type Props = {
  art: ArtImage;
};

const share = ({ title, permalink: url }: ArtImage) => async () => {
  // native share: only Android
  // @ts-ignore
  if (navigator.share) {
    navigator
      // @ts-ignore
      .share({
        title,
        text: "",
        url
      })
      .then(() => console.log("Successful share"))
      .catch(error => console.log("Error sharing", error));
  }
};

const ShareButton = ({ art }: Props) => (
  <ShareButtonAsset
    onClick={share(art)}
    dangerouslySetInnerHTML={{
      __html: icons["share-2"].toSvg()
    }}
  />
);

export { ShareButton };
