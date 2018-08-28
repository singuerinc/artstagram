import * as React from "react";
import Waypoint from "react-waypoint";
import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import { addIndex, concat, filter, compose, prop, uniqBy, map } from "ramda";
import { load } from "./art";
import { ArtImage } from "./artImage";
import { Nav } from "./nav";
import { Image } from "./image";
import { Sorting } from "./sorting";

const mapIndexed = addIndex(map);

const NETLIFY_LAMBDA_FETCH = ".netlify/functions/fetch";

const querySorting = (): Sorting => {
  const params = new URLSearchParams(document.location.search);
  return params.get("sorting") as Sorting;
};

const title = (sorting: Sorting): string => {
  if (sorting === Sorting.COMMUNITY) {
    return "Community";
  }
  return sorting[0].toUpperCase() + sorting.substr(1);
};

type State = {
  page: number;
  sorting: Sorting;
  images: ArtImage[];
};

class App extends React.Component<{}, State> {
  private list: React.RefObject<HTMLUListElement>;

  state = {
    page: 1,
    sorting: null,
    images: [] as ArtImage[]
  };

  constructor(props) {
    super(props);
    this.list = React.createRef();

    this.state.sorting = querySorting() || Sorting.LATEST;

    navigator.serviceWorker.register("service-worker.js");
  }

  updateSorting = (sorting: Sorting) => {
    this.setState({ sorting });
  };

  addImagesInPage = (prevImages: ArtImage[], page: number) => (
    newImages: ArtImage[]
  ) => {
    const withCover = (x: ArtImage) => !!x.cover;

    const add = compose(
      filter(withCover),
      uniqBy(prop("id")),
      concat(prevImages)
    );

    this.setState({
      page,
      images: add(newImages)
    });
  };

  loadImagesByPage = (
    prevImages: ArtImage[],
    page: number,
    sorting: Sorting
  ) => {
    NProgress.start();
    load(NETLIFY_LAMBDA_FETCH, { page, sorting })
      .then(this.addImagesInPage(prevImages, page + 1))
      .then(() => {
        NProgress.done();
      });
  };

  componentDidMount() {
    const { page, sorting } = this.state;

    // load first page
    this.loadImagesByPage([], page, sorting);
  }

  _handleWaypointEnter = ({
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

  _loadNextPage = (
    page: number,
    images: ArtImage[],
    sorting: Sorting
  ) => () => {
    this.loadImagesByPage(images, page, sorting);
  };

  render() {
    if (this.state.images.length === 0) return null;

    const { page, sorting, images } = this.state;
    const lastIndex = images.length - 1;

    const asItem = lastIdx => (art: ArtImage, idx: number) => {
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
              this._handleWaypointEnter(meta);
            }}
          >
            <Image art={art} />
          </Waypoint>
        </li>
      );
    };

    const listItems = mapIndexed(asItem(lastIndex), images);

    return (
      <React.Fragment>
        <h3 className="cat-title">{title(sorting)}</h3>
        <Nav sorting={sorting} />
        <ul className="collection" ref={this.list}>
          {listItems}
          <Waypoint onEnter={this._loadNextPage(page, images, sorting)} />
        </ul>
      </React.Fragment>
    );
  }
}

export { App };
