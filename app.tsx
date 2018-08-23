import * as React from "react";
import { load } from "./art";

class App extends React.Component {
  state = {
    images: []
  };

  componentDidMount() {
    load("https://www.artstation.com/projects.json").then(images => {
      this.setState(prevState => {
        return {
          ...prevState,
          images
        };
      });
    });
  }

  render() {
    const { images } = this.state;
    const item = x => (
      <li>
        <img src={x} />
      </li>
    );

    return <ul>{images.map(item)}</ul>;
  }
}

export { App };
