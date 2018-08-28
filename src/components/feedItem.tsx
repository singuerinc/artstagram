import * as React from "react";
import { icons } from "feather-icons";
import Waypoint from "react-waypoint";
import { Image } from "./image";
import { ArtImage } from "../artImage";

type Props = { lastIdx: number; art: ArtImage; idx: number };
type State = { loaded: boolean };

class FeedItem extends React.Component<Props, State> {
  state = {
    loaded: false
  };

  lazyLoading = (element: HTMLLIElement) => {
    const img = element.querySelector(".cover") as HTMLImageElement;
    if (img.getAttribute("data-loaded") === "true") {
      return;
    }
    img.setAttribute("src", img.getAttribute("data-src"));
    img.setAttribute("data-loaded", "true");
    img.onload = () => {
      img.removeAttribute("data-src");
      this.setState(prevState => ({
        loaded: true
      }));
    };
  };

  render() {
    const { loaded } = this.state;
    const { lastIdx, art, idx } = this.props;
    const { id } = art;
    const className = lastIdx === idx ? "item last" : "item";
    const ref: React.RefObject<HTMLLIElement> = React.createRef();

    return (
      <li key={id} ref={ref} className={`${className}`}>
        <Waypoint
          key={id}
          topOffset={idx === 0 ? 0 : 1500}
          onEnter={() => {
            this.lazyLoading(ref.current);
          }}
        >
          <Image art={art} loaded={loaded} />
        </Waypoint>
      </li>
    );
  }
}

export { FeedItem };
