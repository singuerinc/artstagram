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

const NETLIFY_LAMBDA_FETCH = "/.netlify/functions/fetch";

const title = (sorting: Sorting): string => {
  if (sorting === Sorting.COMMUNITY) {
    return "Community";
  }
  return sorting[0].toUpperCase() + sorting.substr(1);
};

type Props = {
  sorting: Sorting;
};

type State = {
  page: number;
  sorting: Sorting;
  images: ArtImage[];
};

class Feed extends React.Component<Props, State> {
  private list: React.RefObject<HTMLUListElement>;

  state = {
    page: 1,
    sorting: null,
    images: null
  };

  constructor(props: Props) {
    super(props);
    this.list = React.createRef();
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

    const parsed = add(newImages);

    this.setState({
      page,
      images: parsed
    });
  };

  static getDerivedStateFromProps({ match }, prevState) {
    const { params } = match;
    const { sorting } = params;

    if (sorting !== prevState.sorting) {
      const newState = {
        ...prevState,
        images: null,
        sorting
      };

      return newState;
    }

    return null;
  }

  componentDidMount() {
    const { page } = this.state;
    const { params } = this.props.match;
    const { sorting } = params || Sorting.LATEST;

    this.loadImagesByPage([], page, sorting);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.images === null) {
      this.loadImagesByPage([], this.state.page, this.state.sorting);
    }
  }

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

  handleWaypointEnter = ({
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
    this.updateSorting(sorting);
    this.loadImagesByPage(images, page, sorting);
  };

  render() {
    const isLoading = this.state.images === null;

    const { page, sorting, images } = this.state;

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
              this.handleWaypointEnter(meta);
            }}
          >
            <Image art={art} />
          </Waypoint>
        </li>
      );
    };

    return (
      <React.Fragment>
        <h3 className="cat-title">{title(sorting)}</h3>
        <Nav sorting={sorting} />
        {!isLoading && (
          <ul className="collection" ref={this.list}>
            {mapIndexed(asItem(images.length - 1), images)}
            <Waypoint onEnter={this._loadNextPage(page, images, sorting)} />
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export { Feed };
