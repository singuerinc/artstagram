import { icons } from "feather-icons";
import * as R from "ramda";
import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Sorting } from "../Sorting";

const is = (sorting: Sorting) => match =>
  R.isNil(match) ? false : R.equals(match.url, `/feed/${sorting}/`);

const scrollToTop = () => window.scrollTo(0, 0);

const links = [
  {
    icon: "award",
    sorting: Sorting.PICKS,
    title: "Picks",
    to: "/feed/picks/"
  },
  {
    icon: "zap",
    sorting: Sorting.LATEST,
    title: "Latest",
    to: "/feed/latest/"
  },
  {
    icon: "trending-up",
    sorting: Sorting.TRENDING,
    title: "Trending",
    to: "/feed/trending/"
  },
  {
    icon: "users",
    sorting: Sorting.COMMUNITY,
    title: "Community",
    to: "/feed/randomize/"
  }
];

const NavBar = () => (
  <Wrapper>
    {links.map(({ to, title, sorting, icon }, idx) => (
      <NavBarItem key={idx}>
        <StyledNavLink
          to={to}
          title={title}
          activeClassName="selected"
          isActive={is(sorting)}
          onClick={scrollToTop}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: icons[icon].toSvg()
            }}
          />
        </StyledNavLink>
      </NavBarItem>
    ))}
  </Wrapper>
);

const Wrapper = styled.ul`
  margin: 0 auto;
  padding: 1rem;
  list-style-type: none;
  display: flex;
  width: 100%;
  max-width: 48rem;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #111;
  z-index: 999;

  @media only screen and (min-width: 48rem) {
    margin: 0 auto;
    padding: 1rem;
    position: relative;
    left: auto;
    transform: none;
    background-color: transparent;
  }
`;

const NavBarItem = styled.li`
  flex: 1;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  padding: 0rem;
  font-size: 1rem;
  text-transform: uppercase;
  display: block;
  text-decoration: none;
  color: grey;
  transition: color 300ms;

  &:hover {
    color: lightgray;
  }

  &.selected {
    color: peru;
    cursor: auto;
  }
`;

export { NavBar };
