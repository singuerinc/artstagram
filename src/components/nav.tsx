import * as React from "react";
import * as R from "ramda";
import { NavLink } from "react-router-dom";
import { icons } from "feather-icons";
import { Sorting } from "../sorting";

const is = (sorting: Sorting) => match =>
  R.isNil(match) ? false : R.equals(match.url, `/feed/${sorting}`);

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const links = [
  {
    title: "Latest",
    to: "/feed/latest",
    sorting: Sorting.LATEST,
    icon: "zap"
  },
  {
    title: "Picks",
    to: "/feed/picks",
    sorting: Sorting.PICKS,
    icon: "award"
  },
  {
    title: "Trending",
    to: "/feed/trending",
    sorting: Sorting.TRENDING,
    icon: "trending-up"
  },
  {
    title: "Community",
    to: "/feed/randomize",
    sorting: Sorting.COMMUNITY,
    icon: "users"
  }
];

const Nav = () => (
  <ul className="nav">
    {links.map(({ to, title, sorting, icon }, idx) => (
      <li key={idx}>
        <NavLink
          to={to}
          title={title}
          activeClassName="selected"
          isActive={is(sorting)}
          onClick={scrollToTop()}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: icons[icon].toSvg()
            }}
          />
        </NavLink>
      </li>
    ))}
  </ul>
);

export { Nav };
