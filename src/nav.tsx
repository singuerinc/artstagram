import * as React from "react";
import { NavLink } from "react-router-dom";
import { icons } from "feather-icons";

const Nav = ({ sorting }) => {
  return (
    <ul className="nav">
      <li>
        <NavLink to="/feed/latest" activeClassName="selected">
          <div
            dangerouslySetInnerHTML={{
              __html: icons.zap.toSvg()
            }}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/feed/picks" activeClassName="selected">
          <div
            dangerouslySetInnerHTML={{
              __html: icons.award.toSvg()
            }}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/feed/trending" activeClassName="selected">
          <div
            dangerouslySetInnerHTML={{
              __html: icons["trending-up"].toSvg()
            }}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/feed/randomize" activeClassName="selected">
          <div
            dangerouslySetInnerHTML={{
              __html: icons.users.toSvg()
            }}
          />
        </NavLink>
      </li>
    </ul>
  );
};

export { Nav };
