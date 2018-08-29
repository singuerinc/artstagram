import * as React from "react";
import Waypoint from "react-waypoint";
import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as R from "ramda";
import { Route } from "react-router-dom";
import { load } from "../art";
import { UserProfile } from "./userProfile";
import { ArtImage } from "../services/artImage";
import { Nav } from "./nav";
import { Sorting } from "../sorting";
import { SortingTitle } from "./sortingTitle";
import { FeedItem } from "./feedItem";
import { RouteComponentProps } from "../../../../../../Library/Caches/typescript/3.0/node_modules/@types/react-router";

const NETLIFY_LAMBDA_FETCH = "/.netlify/functions/fetch";

const mapIndexed = R.addIndex(R.map);
const hasCover = R.has(["cover"]);

type Props = {
  sorting: Sorting;
};

type State = {
  page: number;
  sorting: Sorting;
  images: ArtImage[];
};

class Feed extends React.Component<RouteComponentProps<Props>, State> {
  private list: React.RefObject<HTMLUListElement>;

  state = {
    page: 1,
    sorting: null,
    images: null
  };

  constructor(props: RouteComponentProps<Props>) {
    super(props);
    this.list = React.createRef();
  }

  updateSorting = (sorting: Sorting) => {
    this.setState({ sorting });
  };

  static getDerivedStateFromProps(
    { match }: RouteComponentProps<Props>,
    prevState
  ) {
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

  loadImagesByPage = async (
    prevImages: ArtImage[],
    page: number,
    sorting: Sorting
  ) => {
    NProgress.start();

    const newImages = await load(NETLIFY_LAMBDA_FETCH, { page, sorting });
    const add = R.compose(
      R.filter(hasCover),
      R.uniqBy(R.prop("id")),
      R.concat(prevImages)
    );

    const parsed = add(newImages);

    this.setState({
      page: page + 1,
      images: parsed
    });

    NProgress.done();
  };

  componentDidMount() {
    const { page } = this.state;
    const { params } = this.props.match;
    const { sorting } = params;

    this.loadImagesByPage([], page, sorting);
  }

  componentDidUpdate() {
    const { images, page, sorting } = this.state;

    // load the images if we don't have any
    if (R.isNil(images)) {
      this.loadImagesByPage([], page, sorting);
    }
  }

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

    return (
      <React.Fragment>
        <Route path="/feed/:sorting/user/:id" component={UserProfile} />
        <SortingTitle sorting={sorting} />
        <Nav />
        {!isLoading && (
          <ul className="collection" ref={this.list}>
            {mapIndexed(
              (art: ArtImage, idx: number) => (
                <FeedItem
                  key={art.id}
                  art={art}
                  idx={idx}
                  lastIdx={images.length - 1}
                />
              ),
              images
            )}
            <Waypoint onEnter={this._loadNextPage(page, images, sorting)} />
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export { Feed };
