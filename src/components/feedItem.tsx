import * as React from "react";
import Waypoint from "react-waypoint";
import { IArtImage } from "../IArtImage";
import { Image } from "./Image";

interface IProps {
  lastIdx: number;
  art: IArtImage;
  idx: number;
}
interface IState {
  src: string;
}

class FeedItem extends React.Component<IProps, IState> {
  public state = {
    src: null
  };

  public render() {
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
