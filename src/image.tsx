import * as React from "react";
import { ArtImage } from "./artImage";

type State = {};
type Props = {
  art: ArtImage;
};

class Image extends React.Component<Props, State> {
  state = {};

  render() {
    const { cover, title, user } = this.props.art;
    const { username } = user;
    return (
      <div>
        <img src={cover.medium_image_url} />
        <div>
          <h1 className="title">{title}</h1>
          <h2 className="user">
            <span>by</span>
            {username}
          </h2>
        </div>
      </div>
    );
  }
}

export { Image };
