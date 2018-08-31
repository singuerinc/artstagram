import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as R from "ramda";
import * as React from "react";
import { Route } from "react-router-dom";
import Waypoint from "react-waypoint";
import styled from "styled-components";
import { RouteComponentProps } from "../../../../../../Library/Caches/typescript/3.0/node_modules/@types/react-router";
import { IArtImage } from "../IArtImage";
import { load } from "../services/api";
import { Sorting } from "../Sorting";
import { FakeFeedItem } from "./FakeFeedItem";
import { Title } from "./feed/Title";
import { FeedItem } from "./FeedItem";
import { NavBar } from "./NavBar";
import { UserProfile } from "./userProfile/UserProfile";

const NETLIFY_LAMBDA_FETCH = "/.netlify/functions/fetch";

const hasCover = R.has(["cover"]);

interface IProps {
  sorting: Sorting;
}

interface IState {
  images: IArtImage[];
  page: number;
  sorting: Sorting;
}

class Feed extends React.Component<RouteComponentProps<IProps>, IState> {
  public static getDerivedStateFromProps(
    { match }: RouteComponentProps<IProps>,
    prevState
  ) {
    const {
      params: { sorting }
    } = match;

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
    const {
      params: { sorting }
    } = this.props.match;

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
          <FeedContainer>
            <FakeFeedItem />
            <FakeFeedItem />
          </FeedContainer>
        )}
        {!isLoading && (
          <FeedContainer>
            {R.map(
              (art: IArtImage) => (
                <FeedItem key={art.id} art={art} />
              ),
              images
            )}
            <Waypoint onEnter={this.loadNextPage(page, images, sorting)} />
          </FeedContainer>
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

const FeedContainer = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 48rem;
`;

export { Feed };
