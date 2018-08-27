import * as React from "react";
import { ifElse, equals, always } from "ramda";

const Nav = ({ sorting }) => {
  const selectedWhen = ifElse(equals(), always("selected"), always(null))(
    sorting
  );

  return (
    <ul className="nav">
      <li className={selectedWhen("latest")}>
        <a href="?sorting=latest">Latest</a>
      </li>
      <li className={selectedWhen("picks")}>
        <a href="?sorting=picks">Picks</a>
      </li>
      <li className={selectedWhen("trending")}>
        <a href="?sorting=trending">Trending</a>
      </li>
      <li className={selectedWhen("randomize")}>
        <a href="?sorting=randomize">Community</a>
      </li>
    </ul>
  );
};

export { Nav };
