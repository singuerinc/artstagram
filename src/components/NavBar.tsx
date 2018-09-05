import OpenColor from "open-color";
import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Sorting } from "../Sorting";

const is = (sorting: Sorting) => match =>
  !match ? false : match.url === `/feed/${sorting}/`;

const scrollToTop = () => window.scrollTo(0, 0);

const links = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
    sorting: Sorting.PICKS,
    title: "Picks",
    to: "/feed/picks/"
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    sorting: Sorting.LATEST,
    title: "Latest",
    to: "/feed/latest/"
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    sorting: Sorting.TRENDING,
    title: "Trending",
    to: "/feed/trending/"
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
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
              __html: icon
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
  background-color: ${OpenColor.gray[9]};
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
  color: ${OpenColor.gray[3]};
  transition: color 300ms;

  &:hover {
    color: ${OpenColor.gray[6]};
  }

  &.selected {
    color: ${OpenColor.white};
    cursor: auto;
  }

  @media only screen and (min-width: 48rem) {
    &.selected {
      color: ${OpenColor.violet[9]};
    }
  }
`;

export { NavBar };
