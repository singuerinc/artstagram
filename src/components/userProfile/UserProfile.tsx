import * as React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { IArtImage, IUser } from "../../IArtImage";
import { Feed } from "../Feed";
import { Sorting } from "../../Sorting";
import { BackButton } from "../common/BackButton";

interface IProps {
  sorting: string;
}

const scrollToTop = () => window.scrollTo(0, 0);

class UserProfile extends React.Component<
  RouteComponentProps<IProps, {}, { art: IArtImage, user: IUser }>
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
      location,
      username
    } = user;

    return (
      <UserProfileContainer>
        <BackButton onClick={() => this.props.history.goBack()} />
        <UserAvatar>
          <img src={medium_avatar_url} alt={full_name} />
        </UserAvatar>
        <UserFullName>{full_name}</UserFullName>
        <UserHeadline>{headline}</UserHeadline>
        <UserCountryCityName>{location}</UserCountryCityName>
        <UserProfileLink href={artstation_profile_url} target="_blank">
          View on ArtStation
        </UserProfileLink>
        <Feed user={user} sorting={Sorting.LATEST} urlFunc={`/.netlify/functions/user-projects?user=${user.username}`} />
      </UserProfileContainer>
    );
  }

  private openUserProfile = (link: string) => () => {
    window.open(link);
  };
}

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
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid white;
    top: -6px;
    left: -6px;
  }
`;

const UserFullName = styled.h1`
  width: 100%;
  text-align: center;
  margin: 1rem;
  padding: 0;
  font-size: 1.6rem;
`;

const UserCountryCityName = styled.p`
  width: 100%;
  text-align: center;
  font-style: italic;
  margin: 0.5rem;
  padding: 0;
`;

const UserHeadline = styled.p`
  width: 100%;
  text-align: center;
  margin: 0 1rem;
  padding: 0;
`;

const UserProfileLink = styled.a`
  width: 100%;
  text-align: center;
  display: block;
  color: grey;
  text-decoration: none;
  margin: 1rem;
  &:hover {
    color: white;
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
