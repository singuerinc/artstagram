import * as React from "react";
import Waypoint from "react-waypoint";
import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import { addIndex, concat, filter, compose, prop, uniqBy, map } from "ramda";
import { load } from "./art";
import { ArtImage } from "./artImage";
import { Nav } from "./nav";
import { Image } from "./image";

const mapIndexed = addIndex(map);

const NETLIFY_LAMBDA_FETCH = ".netlify/functions/fetch";

const querySorting = () => {
  const params = new URLSearchParams(document.location.search);
  return params.get("sorting");
};

const title = (sorting: string): string => {
  if (sorting === "randomize") {
    sorting = "community";
  }
  return sorting[0].toUpperCase() + sorting.substr(1);
};

type State = {
  page: number;
  sorting: string;
  images: ArtImage[];
};

class App extends React.Component<{}, State> {
  private list;

  state = {
    page: 1,
    sorting: null,
    images: [] as ArtImage[]
  };

  constructor(props) {
    super(props);
    this.list = React.createRef();

    this.state.sorting = querySorting() || "latest";
  }

  updateSorting = (sorting: string) => {
    this.setState({ sorting });
  };

  addImagesInPage = (prevImages: ArtImage[], page: number) => (
    newImages: ArtImage[]
  ) => {
    const withCover = (x: ArtImage) => !!x.cover;
    // const notAdult = (x: ArtImage) => !x.adult_content;

    const add = compose(
      // filter(notAdult),
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
    sorting: string
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

  _handleWaypointEnter = ({ element }: Waypoint.CallbackArgs) => {
    const img = element.querySelector(".cover");
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = () => {
      img.removeAttribute("data-src");
    };
  };

  _loadNextPage = (page: number, images: ArtImage[], sorting: string) => () => {
    this.loadImagesByPage(images, page, sorting);
  };

  render() {
    if (this.state.images.length === 0) return null;

    const { page, sorting, images } = this.state;
    const lastIndex = images.length - 1;

    const asItem = lastIdx => (art: ArtImage, idx: number) => {
      const { id } = art;
      const className = lastIdx === idx ? "item last" : "item";
      const adultClass = art.adult_content ? "adult" : "";
      const ref = React.createRef();
      return (
        <li key={id} ref={ref} className={`${className} ${adultClass}`}>
          <Waypoint
            topOffset={1500}
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
