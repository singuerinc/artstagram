import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import { icons } from "feather-icons";
import { ArtImage } from "../artImage";
import { NavLink } from "react-router-dom";
import { ShareButton } from "./feedItem/ShareButton";

const smallToLarge = R.replace("/small/", "/large/");

type Props = {
  innerRef?: any;
  art: ArtImage;
  loaded: boolean;
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

  hideMe = (el: HTMLDivElement) => {
    el.classList.add("hide");
  };

  render() {
    const { art, loaded } = this.props;
    const { cover, title, user, adult_content: isMatureContent } = art;
    const { full_name, username, medium_avatar_url } = user;
    const style = {
      paddingTop: 100 / cover.aspect + "%"
    };

    return (
      <div className="image" ref={this.props.innerRef}>
        <NavLink
          className="user-header"
          to={{ pathname: `user/${user.id}`, state: { art } }}
        >
          <img
            className="avatar"
            title={username}
            alt={username}
            src={medium_avatar_url}
          />
          <h2 className="user">{full_name}</h2>
          <h3 className="username">@{username}</h3>
        </NavLink>
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
          {!loaded && (
            <div className="loader">
              <div className="loader-icon" />
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
        <Footer>
          <h1 className="title">{title}</h1>
          <ShareButton art={art} />
        </Footer>
      </div>
    );
  }
}

const Footer = styled.footer`
  display: flex;
  padding: 1rem;
  align-items: center;
`;

export { Image };
