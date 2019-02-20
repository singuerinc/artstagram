import * as OpenColor from "open-color";
import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IArtImage, IUser } from "../../IArtImage";

export interface IProps {
  art: IArtImage;
  user: IUser;
}

const FeedItemHeader = ({ art, user }: IProps) => (
  <StyledNavLink
    to={{ pathname: `/user/${user.username}`, state: { art, user } }}
  >
    <Avatar
      title={`@${user.username}`}
      alt={`@${user.username}`}
      src={user.medium_avatar_url}
    />
    <UserFullName>{user.full_name}</UserFullName>
    <UserName>@{user.username}</UserName>
  </StyledNavLink>
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

const StyledNavLink = styled(NavLink)`
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

export { FeedItemHeader, StyledNavLink, UserFullName, UserName, Avatar };
