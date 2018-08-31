import { icons } from "feather-icons";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";

interface IProps {
  sorting: string;
}

interface IState {
  open: boolean;
}

class UserProfile extends React.Component<RouteComponentProps<IProps>, IState> {
  public state = {
    open: false
  };

  public componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({
        open: true
      }));
    }, 5);
  }

  public render() {
    const { match } = this.props;
    const { sorting } = match.params;
    const { art }: { art: IArtImage } = this.props.location.state;
    const {
      headline,
      medium_avatar_url,
      full_name,
      artstation_profile_url,
      location
    } = art.user;

    return (
      <UserProfileContainer open={this.state.open}>
        <BackButton to={`/feed/${sorting}/`}>
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
        <UserBackground src={art.cover.medium_image_url} />
      </UserProfileContainer>
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
    color: white;
  }
`;

const UserProfileContainer = styled.div.attrs<{ open: boolean }>({
  open: props => props.open
})`
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
  position: fixed;
  z-index: 9999999;
  left: 50%;
  backface-visibility: hidden;
  perspective: 1000;
  transition: transform 600ms cubic-bezier(0.19, 1, 0.22, 1);
  transform: ${props =>
    props.open ? "translate3d(-50%, 0, 0)" : "translate3d(50%, 0, 0)"};

  @media only screen and (min-width: 48rem) {
    transform: ${props =>
      props.open ? "translate3d(-50%, 0, 0)" : "translate3d(-50%, 100vh, 0)"};
  }
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
