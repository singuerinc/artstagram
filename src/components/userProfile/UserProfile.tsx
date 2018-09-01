import { icons } from "feather-icons";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";
import { Sorting } from "../../Sorting";
import { Feed } from "../Feed";

interface IProps {
  sorting: string;
}

interface IState {
  open: boolean;
}

const scrollToTop = () => window.scrollTo(0, 0);

class UserProfile extends React.Component<
  RouteComponentProps<IProps, {}, { art: IArtImage }>,
  IState
> {
  public state = {
    open: false
  };

  public componentDidMount() {
    scrollToTop();
    setTimeout(this.setState.bind(this), 1, { open: true });
  }

  public render() {
    const {
      match: {
        params: { sorting }
      }
    } = this.props;
    const { art } = this.props.location.state;
    const {
      headline,
      medium_avatar_url,
      full_name,
      username,
      artstation_profile_url,
      location
    } = art.user;

    return (
      <React.Fragment>
        <UserProfileContainer open={this.state.open}>
          <BackButton to="" onClick={() => this.props.history.goBack()}>
            <div
              dangerouslySetInnerHTML={{
                __html: icons.x.toSvg()
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
          {/* <UserBackground src={art.cover.medium_image_url} /> */}
        </UserProfileContainer>
        <Feed
          urlFunc={`/.netlify/functions/fetch?url=https://www.artstation.com/users/${username}/projects.json`}
          sorting={Sorting.NONE}
        />
      </React.Fragment>
    );
  }

  private openUserProfile = (link: string) => () => {
    window.open(link);
  };
}

const BackButton = styled(NavLink)`
  align-self: flex-start;
  padding: 16px;
  color: gray;
  cursor: pointer;
  transition: color 300ms;
  &:hover {
    color: black;
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
  text-align: center;
  margin: 2rem 1rem 0;
  padding: 0;
`;

const UserCountryCityName = styled.p`
  font-style: italic;
  text-align: center;
  margin: 1rem 1rem;
  padding: 0;
`;

const UserHeadline = styled.p`
  text-align: center;
  margin: 1rem 2rem;
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

export {
  UserProfile,
  UserBackground,
  UserAvatar,
  UserFullName,
  UserCountryCityName,
  UserHeadline,
  UserProfileLink
};
