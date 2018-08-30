import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as R from "ramda";
import * as React from "react";
import { Route } from "react-router-dom";
import Waypoint from "react-waypoint";
import { RouteComponentProps } from "../../../../../../Library/Caches/typescript/3.0/node_modules/@types/react-router";
import { IArtImage } from "../IArtImage";
import { load } from "../services/api";
import { Sorting } from "../Sorting";
import { FakeFeedItem } from "./FakeFeedItem";
import { Title } from "./feed/Title";
import { FeedItem } from "./FeedItem";
import { NavBar } from "./NavBar";
import { UserProfile } from "./UserProfile";

const NETLIFY_LAMBDA_FETCH = "/.netlify/functions/fetch";

const mapIndexed = R.addIndex(R.map);
const hasCover = R.has(["cover"]);

interface IProps {
  sorting: Sorting;
}

interface IState {
  images: IArtImage[];
  page: number;
  sorting: Sorting;
}

const FeedItemFactory = (lastIdx: number) => (art: IArtImage, idx: number) => (
  <FeedItem key={art.id} art={art} idx={idx} lastIdx={lastIdx} />
);

class Feed extends React.Component<RouteComponentProps<IProps>, IState> {
  public static getDerivedStateFromProps(
    { match }: RouteComponentProps<IProps>,
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

  public state = {
    images: null,
    page: 1,
    sorting: null
  };

  public componentDidMount() {
    const { page } = this.state;
    const { params } = this.props.match;
    const { sorting } = params;

    this.loadImagesByPage([], page, sorting);
  }

  public componentDidUpdate() {
    const { images, page, sorting } = this.state;

    // load the images if we don't have any
    if (R.isNil(images)) {
      this.loadImagesByPage([], page, sorting);
    }
  }

  public render() {
    const { page, sorting, images } = this.state;
    const isLoading = R.isNil(images);

    return (
      <React.Fragment>
        <Route path="/feed/:sorting/user/:id" component={UserProfile} />
        <Title title={sorting} />
        <NavBar />
        {isLoading && (
          <ul className="collection">
            <FakeFeedItem />
            <FakeFeedItem />
          </ul>
        )}
        {!isLoading && (
          <ul className="collection">
            {mapIndexed(FeedItemFactory(images.length - 1), images)}
            <Waypoint onEnter={this.loadNextPage(page, images, sorting)} />
          </ul>
        )}
      </React.Fragment>
    );
  }

  private loadImagesByPage = async (
    prevImages: IArtImage[],
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
      images: parsed,
      page: page + 1
    });

    NProgress.done();
  };

  private loadNextPage = (
    page: number,
    images: IArtImage[],
    sorting: Sorting
  ) => () => {
    this.updateSorting(sorting);
    this.loadImagesByPage(images, page, sorting);
  };

  private updateSorting = (sorting: Sorting) => {
    this.setState({ sorting });
  };
}

export { Feed };
