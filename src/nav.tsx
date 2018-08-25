import * as React from "react";

class Nav extends React.Component {
  state = {};

  render() {
    return (
      <ul className="nav">
        <li>
          <a href="?sorting=latest">Latest</a>
        </li>
        <li>
          <a href="?sorting=picks">Picks</a>
        </li>
        <li>
          <a href="?sorting=trending">Trending</a>
        </li>
        <li>
          <a href="?sorting=randomize">Community</a>
        </li>
      </ul>
    );
  }
}

export { Nav };
