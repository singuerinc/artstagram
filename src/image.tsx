import * as React from "react";
import { ArtImage } from "./artImage";

type Props = {
  innerRef?: any;
  art: ArtImage;
};

class Image extends React.Component<Props> {
  openLargeImage = (small_image_url: string) => event => {
    const smallToLarge = (x: string) => x.replace("/small/", "/large/");

    window.open(smallToLarge(small_image_url));
  };

  openUserProfile = (link: string) => event => {
    window.open(link);
  };

  render() {
    const { cover, title, user } = this.props.art;
    const { username, medium_avatar_url } = user;

    return (
      <div className="image" ref={this.props.innerRef}>
        <div
          className="user-header"
          onClick={this.openUserProfile(user.permalink)}
        >
          <img
            className="avatar"
            title={username}
            alt={username}
            src={medium_avatar_url}
          />
          <h2 className="user">{username}</h2>
        </div>
        <div
          className="image-container"
          style={{
            paddingTop: 100 / cover.aspect + "%"
          }}
        >
          <img
            className="cover"
            data-src={cover.medium_image_url}
            title={title}
            alt={title}
            onClick={this.openLargeImage(cover.small_image_url)}
          />
        </div>
        <h1 className="title">{title}</h1>
      </div>
    );
  }
}

export { Image };
