import * as React from "react";
import { ifElse, equals, always } from "ramda";

const Nav = ({ sorting }) => {
  const selectedWhen = ifElse(equals(), always("selected"), always(null))(
    sorting
  );

  return (
    <ul className="nav">
      <li>
        <a className={selectedWhen("latest")} href="?sorting=latest">
          Latest
        </a>
      </li>
      <li>
        <a className={selectedWhen("picks")} href="?sorting=picks">
          Picks
        </a>
      </li>
      <li>
        <a className={selectedWhen("trending")} href="?sorting=trending">
          Trending
        </a>
      </li>
      <li>
        <a className={selectedWhen("randomize")} href="?sorting=randomize">
          Community
        </a>
      </li>
    </ul>
  );
};

export { Nav };
