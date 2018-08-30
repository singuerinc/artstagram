import * as React from "react";
import Waypoint from "react-waypoint";
import { Image } from "./image";
import { ArtImage } from "../artImage";

type Props = { lastIdx: number; art: ArtImage; idx: number };
type State = { src: string };

class FeedItem extends React.Component<Props, State> {
  state = {
    src: null
  };

  render() {
    const { src } = this.state;
    const { lastIdx, art, idx } = this.props;
    const { id, cover } = art;
    const className = lastIdx === idx ? "item last" : "item";
    const ref: React.RefObject<HTMLLIElement> = React.createRef();

    return (
      <li key={id} ref={ref} className={`${className}`}>
        <Waypoint
          key={id}
          scrollableAncestor={window}
          bottomOffset={-500}
          onEnter={() => {
            if (src === null) {
              this.setState(prevState => ({
                src: cover.medium_image_url
              }));
            }
          }}
        >
          <Image art={art} src={src} />
        </Waypoint>
      </li>
    );
  }
}

export { FeedItem };
