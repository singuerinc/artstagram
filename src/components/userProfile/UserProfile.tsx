import OpenColor from "open-color";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { IArtImage, IUser } from "../../IArtImage";
import { BackButton } from "../common/BackButton";
import { Feed } from "../Feed";
import { ShareButton, ShareButtonAsset } from "../feedItem/ShareButton";

interface IProps {
  sorting: string;
}

const scrollToTop = () => window.scrollTo(0, 0);

class UserProfile extends React.Component<
  RouteComponentProps<IProps, {}, { art: IArtImage; user: IUser }>
> {
  public componentDidMount() {
    scrollToTop();
  }

  public render() {
    const { user } = this.props.location.state;
    const {
      headline,
      medium_avatar_url,
      full_name,
      artstation_profile_url,
      location
    } = user;

    return (
      <UserProfileContainer>
        <BackButton onClick={() => this.props.history.goBack()} />
        <UserInfoContainer>
          <UserAvatar>
            <img src={medium_avatar_url} alt={full_name} />
          </UserAvatar>
          {navigator.share && (
            <ShareButton title={full_name} permalink={artstation_profile_url} />
          )}
          <UserFullName>{full_name}</UserFullName>
          <UserHeadline
            dangerouslySetInnerHTML={{
              __html: headline
            }}
          />
          <UserCountryCityName>{location}</UserCountryCityName>
          <UserProfileLink href={artstation_profile_url} target="_blank">
            View on ArtStation
          </UserProfileLink>
        </UserInfoContainer>
        <Feed
          user={user}
          urlFunc={`/.netlify/functions/user-projects?user=${user.username}`}
        />
      </UserProfileContainer>
    );
  }
}

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;

  ${ShareButtonAsset} {
    margin: 2rem 0 0;
  }
`;

const UserProfileContainer = styled.div`
  margin: 0 auto 2rem;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  max-width: 48rem;
  width: 100%;
`;

const UserBackground = styled.img`
  position: absolute;
  height: 100vh;
  opacity: 0.3;
  pointer-events: none;
`;

const UserAvatar = styled.div`
  position: relative;
  margin: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;

  img {
    width: 100%;
    border-radius: 50%;
  }

  ::before {
    content: "";
    position: absolute;
    z-index: 3;
    width: 74px;
    height: 74px;
    border-radius: 50%;
    border: 6px solid ${OpenColor.gray[3]};
    top: -11px;
    left: -11px;
  }
`;

const UserFullName = styled.h1`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  padding: 0 1rem;
  font-size: 1.6rem;
`;

const UserCountryCityName = styled.p`
  width: 100%;
  text-align: center;
  font-style: italic;
  margin: 0.5rem;
  padding: 0 1rem;
`;

const UserHeadline = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0 1rem;
`;

const UserProfileLink = styled.a`
  width: 100%;
  text-align: center;
  display: block;
  color: ${OpenColor.gray[6]};
  text-decoration: none;
  margin: 1rem;
  transition: color 300ms;
  &:hover {
    color: ${OpenColor.gray[9]};
  }
`;

export {
  UserProfile,
  UserBackground,
  UserAvatar,
  UserFullName,
  UserCountryCityName,
  UserHeadline,
  UserProfileLink
};
