import * as React from "react";
import Waypoint from "react-waypoint";
import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as R from "ramda";
import { load } from "./art";
import { ArtImage } from "./artImage";
import { Nav } from "./nav";
import { Image } from "./image";
import { Sorting } from "./sorting";

const NETLIFY_LAMBDA_FETCH = "/.netlify/functions/fetch";

const mapIndexed = R.addIndex(R.map);
const hasCover = R.has(["cover"]);
const capitalize = R.compose(
  R.join(""),
  R.over(R.lensIndex(0), R.toUpper)
);

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
    const add = R.compose(
      R.filter(hasCover),
      R.uniqBy(R.prop("id")),
      R.concat(prevImages)
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

  componentDidUpdate() {
    const { images, page, sorting } = this.state;

    // load the images if we don't have any
    if (R.isNil(images)) {
      this.loadImagesByPage([], page, sorting);
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
    const { page, sorting, images } = this.state;
    const isLoading = R.isNil(images);

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
        <h3 className="cat-title">{capitalize(sorting)}</h3>
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
