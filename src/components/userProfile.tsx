import * as React from "react";
import { icons } from "feather-icons";
import styled from "styled-components";
import { ArtImage } from "../artImage";
import { RouteProps } from "../../../../../../Library/Caches/typescript/3.0/node_modules/@types/react-router";
import { NavLink } from "react-router-dom";

class UserProfile extends React.Component<RouteProps> {
  openUserProfile = (link: string) => () => {
    window.open(link);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { art }: { art: ArtImage } = this.props.location.state;
    const {
      headline,
      medium_avatar_url,
      full_name,
      artstation_profile_url,
      location
    } = art.user;

    return (
      <UserProfileContainer>
        <BackButton to="/feed/latest">
          <div
            dangerouslySetInnerHTML={{
              __html: icons["arrow-left"].toSvg()
            }}
          />
        </BackButton>
        <UserAvatar>
          <img src={medium_avatar_url} alt={full_name} />
        </UserAvatar>
        <UserFullName>{full_name}</UserFullName>
        <UserHeadline>{headline}</UserHeadline>
        <UserCountryCityName>{location}</UserCountryCityName>
        <UserProfileLink href={artstation_profile_url} target="_blank">
          View on ArtStation
        </UserProfileLink>
        <UserBackground src={art.cover.medium_image_url} />
      </UserProfileContainer>
    );
  }
}

const BackButton = styled(NavLink)`
  align-self: flex-start;
  padding: 16px;
  color: gray;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const UserProfileContainer = styled.div`
  background-color: #111;
  height: 100vh;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  max-width: 48rem;
  width: 100%;
  color: white;
  overflow: hidden;
  position: relative;
`;

const UserBackground = styled.img`
  position: absolute;
  height: 100vh;
  opacity: 0.1;
  pointer-events: none;
`;

const UserAvatar = styled.div`
  position: relative;
  margin: 0;
  width: 96px;
  height: 96px;
  border-radius: 50%;

  img {
    width: 100%;
    border-radius: 50%;
  }

  ::before {
    content: "";
    position: absolute;
    z-index: 3;
    width: 104px;
    height: 104px;
    border-radius: 50%;
    border: 4px solid gray;
    top: -8px;
    left: -8px;
  }
`;

const UserFullName = styled.h1`
  margin: 1rem 0 0;
  padding: 0;
`;

const UserCountryCityName = styled.p`
  margin: 1rem 0;
  padding: 0;
`;

const UserHeadline = styled.p`
  margin: 0;
  padding: 0;
`;

const UserProfileLink = styled.a`
  display: block;
  color: grey;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

export { UserProfile };
