import * as React from "react";

type State = {};
type Props = {
  onClick: (event) => void;
};

class Nav extends React.Component<Props, State> {
  state = {};

  onClick = (sorting: string) => this.props.onClick(sorting);

  render() {
    return (
      <ul className="nav">
        <li>
          <a href="#" onClick={() => this.onClick("picks")}>
            Picks
          </a>
        </li>
        <li>
          <a href="#" onClick={() => this.onClick("trending")}>
            Trending
          </a>
        </li>
        <li>
          <a href="#" onClick={() => this.onClick("latest")}>
            Latest
          </a>
        </li>
        <li>
          <a href="#" onClick={() => this.onClick("randomize")}>
            Community
          </a>
        </li>
      </ul>
    );
  }
}

export { Nav };
