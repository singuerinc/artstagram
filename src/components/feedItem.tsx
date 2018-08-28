import * as React from "react";
import * as R from "ramda";
import Waypoint from "react-waypoint";
import { Image } from "./image";
import { ArtImage } from "../artImage";

type Props = { lastIdx: number; art: ArtImage; idx: number };

const handleWaypointEnter = ({
  element
}: Waypoint.CallbackArgs & { element: HTMLLIElement }) => {
  const img = element.querySelector(".cover") as HTMLImageElement;
  if (img.getAttribute("data-loaded") === "true") {
    return;
  }
  img.setAttribute("src", img.getAttribute("data-src"));
  img.setAttribute("data-loaded", "true");
  img.onload = () => {
    img.removeAttribute("data-src");
  };
};

const FeedItem = ({ lastIdx, art, idx }: Props) => {
  const { id } = art;
  const className = lastIdx === idx ? "item last" : "item";
  const ref: React.RefObject<HTMLLIElement> = React.createRef();

  return (
    <li key={id} ref={ref} className={`${className}`}>
      <Waypoint
        key={id}
        topOffset={idx === 0 ? 0 : 1500}
        onEnter={meta => {
          meta["element"] = ref.current;
          handleWaypointEnter(meta);
        }}
      >
        <Image art={art} />
      </Waypoint>
    </li>
  );
};

export { FeedItem };
