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

const share = ({
  title,
  description: text,
  permalink: url
}: ArtImage) => async () => {
  // if (navigator.share) {
  //   await navigator.share({
  //     title,
  //     text,
  //     url
  //   });
  // }

  navigator
    .share({
      title: "Web Fundamentals",
      text: "Check out Web Fundamentals — it rocks!",
      url: "https://developers.google.com/web"
    })
    .then(() => console.log("Successful share"))
    .catch(error => console.log("Error sharing", error));
};

class ShareButton extends React.Component<Props> {
  render() {
    const { art } = this.props;
    return (
      <ShareButtonAsset
        onClick={share(art)}
        dangerouslySetInnerHTML={{
          __html: icons["share-2"].toSvg()
        }}
      />
    );
  }
}

export { ShareButton };
