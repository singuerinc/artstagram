import * as React from "react";
import { ifElse, equals, always } from "ramda";
import { icons } from "feather-icons";

const Nav = ({ sorting }) => {
  const selectedWhen = ifElse(equals(), always("selected"), always(null))(
    sorting
  );

  return (
    <ul className="nav">
      <li className={selectedWhen("latest")}>
        <a href="?sorting=latest">
          <div
            dangerouslySetInnerHTML={{
              __html: icons.zap.toSvg()
            }}
          />
        </a>
      </li>
      <li className={selectedWhen("picks")}>
        <a href="?sorting=picks">
          <div
            dangerouslySetInnerHTML={{
              __html: icons.award.toSvg()
            }}
          />
        </a>
      </li>
      <li className={selectedWhen("trending")}>
        <a href="?sorting=trending">
          <div
            dangerouslySetInnerHTML={{
              __html: icons["trending-up"].toSvg()
            }}
          />
        </a>
      </li>
      <li className={selectedWhen("randomize")}>
        <a href="?sorting=randomize">
          <div
            dangerouslySetInnerHTML={{
              __html: icons.users.toSvg()
            }}
          />
        </a>
      </li>
    </ul>
  );
};

export { Nav };
