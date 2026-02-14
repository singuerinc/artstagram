import OpenColor from "open-color";
import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import { Sorting } from "../Sorting";

const scrollToTop = () => window.scrollTo(0, 0);

const links = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
    sorting: Sorting.PICKS,
    title: "Picks",
    to: "/feed/$sorting",
    params: { sorting: "picks" },
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    sorting: Sorting.LATEST,
    title: "Latest",
    to: "/feed/$sorting",
    params: { sorting: "latest" },
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    sorting: Sorting.TRENDING,
    title: "Trending",
    to: "/feed/$sorting",
    params: { sorting: "trending" },
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    sorting: Sorting.COMMUNITY,
    title: "Community",
    to: "/feed/$sorting",
    params: { sorting: "randomize" },
  },
];

const NavBar = () => (
  <Wrapper>
    {links.map(({ to, params, title, icon }, idx) => (
      <NavBarItem key={idx}>
        <Link
          to={to}
          params={params}
          title={title}
          className="nav-link"
          onClick={scrollToTop}
          activeProps={{ className: "nav-link active" }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: icon,
            }}
          />
        </Link>
      </NavBarItem>
    ))}
  </Wrapper>
);

const Wrapper = styled.nav`
  margin: 0;
  padding: 1rem;
  list-style-type: none;
  display: flex;
  width: 100%;
  position: sticky;
  bottom: 0;
  background-color: ${OpenColor.gray[9]};
  z-index: 999;

  @media only screen and (min-width: 48rem) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    position: sticky;
    top: 0;
    bottom: auto;
    width: 4rem;
    height: 100vh;
    background-color: transparent;
  }

  .nav-link {
    padding: 0rem;
    font-size: 1rem;
    text-transform: uppercase;
    display: block;
    text-decoration: none;
    color: ${OpenColor.gray[6]};
    transition: color 300ms;

    &:hover {
      color: ${OpenColor.gray[9]};
    }

    &.active {
      color: ${OpenColor.white};
      cursor: auto;
    }

    @media only screen and (min-width: 48rem) {
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 2px solid transparent;
      transition: color 300ms, border-color 300ms;

      &:hover {
        border-color: ${OpenColor.gray[3]};
      }

      &.active {
        color: ${OpenColor.gray[9]};
      }
    }
  }
`;

const NavBarItem = styled.li`
  flex: 1;
  text-align: center;

  @media only screen and (min-width: 48rem) {
    flex: none;
  }
`;

export { NavBar };
