import OpenColor from "open-color";
import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import { IArtImage, IUser } from "../../IArtImage";

export interface IProps {
  art: IArtImage;
  user: IUser;
}

const FeedItemHeader = ({ art, user }: IProps) => (
  <StyledLink
    to="/user/$id"
    params={{ id: user.username }}
    search={{
      username: user.username,
      full_name: user.full_name,
      medium_avatar_url: user.medium_avatar_url,
      headline: user.headline,
      artstation_profile_url: user.artstation_profile_url,
      location: user.location,
    }}
  >
    <Avatar
      title={`@${user.username}`}
      alt={`@${user.username}`}
      src={user.medium_avatar_url}
    />
    <UserFullName>{user.full_name}</UserFullName>
    <UserName>@{user.username}</UserName>
  </StyledLink>
);

const UserFullName = styled.h2`
  font-size: 1rem;
  padding: 0;
  margin: 0 0.8rem;
  font-weight: 500;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${OpenColor.gray[9]};
`;

const UserName = styled.h3`
  margin: 0;
  font-weight: 300;
  color: ${OpenColor.gray[6]};
  margin-left: auto;
  font-size: 0.9rem;
`;

const Avatar = styled.img`
  margin: 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledLink = styled(Link)`
  margin: 0.7rem 1rem;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  color: ${OpenColor.gray[9]};
  text-decoration: none;
  transition: color 300ms;

  &:hover {
    color: ${OpenColor.gray[6]};
  }

  &::before {
    border: 2px solid ${OpenColor.gray[3]};
    border-radius: 50%;
    content: "";
    z-index: 1;
    display: block;
    position: absolute;
    top: -4px;
    left: -4px;
    width: 36px;
    height: 36px;
  }
`;

export { FeedItemHeader, StyledLink, UserFullName, UserName, Avatar };
