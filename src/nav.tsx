import * as React from "react";
import * as R from "ramda";
import { NavLink } from "react-router-dom";
import { icons } from "feather-icons";
import { Sorting } from "./sorting";

const is = (sorting: Sorting) => match =>
  R.isNil(match) ? false : R.equals(match.url, `/feed/${sorting}`);

const links = [
  {
    to: "/feed/latest",
    sorting: Sorting.LATEST,
    icon: "zap"
  },
  {
    to: "/feed/picks",
    sorting: Sorting.PICKS,
    icon: "award"
  },
  {
    to: "/feed/trending",
    sorting: Sorting.TRENDING,
    icon: "trending-up"
  },
  {
    to: "/feed/randomize",
    sorting: Sorting.COMMUNITY,
    icon: "users"
  }
];

const Nav = () => (
  <ul className="nav">
    {links.map(({ to, sorting, icon }) => (
      <li>
        <NavLink to={to} activeClassName="selected" isActive={is(sorting)}>
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
