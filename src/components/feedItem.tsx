import * as React from "react";
import { icons } from "feather-icons";
import Waypoint from "react-waypoint";
import { Image } from "./image";
import { ArtImage } from "../artImage";

type Props = { lastIdx: number; art: ArtImage; idx: number };
type State = { loaded: boolean };

class FeedItem extends React.Component<Props, State> {
  private image: HTMLImageElement;

  state = {
    loaded: false
  };

  lazyLoading = (element: HTMLLIElement) => {
    this.image = element.querySelector(".cover") as HTMLImageElement;
    if (this.image.getAttribute("data-loaded") === "true") {
      return;
    }
    this.image.setAttribute("src", this.image.getAttribute("data-src"));
    this.image.setAttribute("data-loaded", "true");
    this.image.onload = () => {
      this.image.removeAttribute("data-src");
      this.setState(() => ({
        loaded: true
      }));
    };
  };

  componentWillUnmount() {
    try {
      this.image.onload = () => {
        //
      };
    } catch (e) {}
  }

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
