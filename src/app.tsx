import * as React from "react";
import { map } from "ramda";
import { load } from "./art";
import { ArtImage } from "./artImage";

type State = {
  images: ArtImage[];
};

class App extends React.Component<{}, State> {
  state = {
    images: [] as ArtImage[]
  };

  updateImages = (images: ArtImage[]) => {
    this.setState(prevState => {
      return {
        ...prevState,
        images
      };
    });
  };

  componentDidMount() {
    load(".netlify/functions/fetch").then(this.updateImages);
  }

  render() {
    const { images } = this.state;

    const asItem = ({ id, src }: ArtImage) => (
      <li key={id}>
        <img src={src} />
      </li>
    );

    return <ul>{map(asItem, images)}</ul>;
  }
}

export { App };
