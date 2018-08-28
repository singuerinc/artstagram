import * as React from "react";
import { ArtImage } from "./artImage";

type Props = {
  innerRef?: any;
  art: ArtImage;
};

class Image extends React.Component<Props> {
  matureLayer: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.matureLayer = React.createRef();
  }
  openLargeImage = (small_image_url: string) => event => {
    const smallToLarge = (x: string) => x.replace("/small/", "/large/");

    window.open(smallToLarge(small_image_url));
  };

  openUserProfile = (link: string) => event => {
    window.open(link);
  };

  hideMe = el => {
    el.classList.add("hide");
  };

  render() {
    const { cover, title, user, adult_content } = this.props.art;
    const { username, medium_avatar_url } = user;
    const isMatureContent = adult_content === true;
    const style = {
      paddingTop: 100 / cover.aspect + "%"
    };

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
        <div className="image-container" style={style}>
          {isMatureContent && (
            <div
              className="mature-content"
              ref={this.matureLayer}
              onClick={() => this.hideMe(this.matureLayer.current)}
            >
              <span>
                Mature content
                <br />
                Click to view
              </span>
            </div>
          )}
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
