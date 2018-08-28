import * as React from "react";
import * as R from "ramda";
import { ArtImage } from "../artImage";

const smallToLarge = R.replace("/small/", "/large/");

type Props = {
  innerRef?: any;
  art: ArtImage;
};

class Image extends React.Component<Props> {
  matureLayer: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.matureLayer = React.createRef();
  }

  openLargeImage = (small_image_url: string) => () => {
    window.open(smallToLarge(small_image_url));
  };

  openUserProfile = (link: string) => () => {
    window.open(link);
  };

  hideMe = (el: HTMLDivElement) => {
    el.classList.add("hide");
  };

  render() {
    const {
      cover,
      title,
      user,
      adult_content: isMatureContent
    } = this.props.art;
    const { username, medium_avatar_url } = user;
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
