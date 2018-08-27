import * as React from "react";

const classBySelected = (
  sorting: string[],
  selected: string
): string | null => {
  return sorting.includes(selected) ? "selected" : null;
};

const Nav = ({ selected }) => (
  <ul className="nav">
    <li>
      <a
        className={classBySelected(["latest", ""], selected)}
        href="?sorting=latest"
      >
        Latest
      </a>
    </li>
    <li>
      <a className={classBySelected(["picks"], selected)} href="?sorting=picks">
        Picks
      </a>
    </li>
    <li>
      <a
        className={classBySelected(["trending"], selected)}
        href="?sorting=trending"
      >
        Trending
      </a>
    </li>
    <li>
      <a
        className={classBySelected(["randomize"], selected)}
        href="?sorting=randomize"
      >
        Community
      </a>
    </li>
  </ul>
);

export { Nav };
