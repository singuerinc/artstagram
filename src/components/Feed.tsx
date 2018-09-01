import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as R from "ramda";
import * as React from "react";
import Waypoint from "react-waypoint";
import styled from "styled-components";
import { IArtImage } from "../IArtImage";
import { load } from "../services/api";
import { Sorting } from "../Sorting";
import { FakeFeedItem } from "./FakeFeedItem";
import { Title } from "./feed/Title";
import { FeedItem } from "./FeedItem";
import { NavBar } from "./NavBar";

const hasCover = R.has(["cover"]);

interface IProps {
  sorting: Sorting;
  urlFunc: string;
}

interface IState {
  images: IArtImage[];
  page: number;
  sorting: Sorting;
}

class Feed extends React.Component<IProps, IState> {
  public static getDerivedStateFromProps(props: IProps, prevState: IState) {
    const { sorting } = props;

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
    const { urlFunc } = this.props;
    const { page, sorting } = this.state;

    this.loadImagesByPage([], page, sorting, urlFunc);
  }

  public componentDidUpdate() {
    const { urlFunc } = this.props;
    const { images, page, sorting } = this.state;

    // load the images if we don't have any
    if (R.isNil(images)) {
      this.loadImagesByPage([], page, sorting, urlFunc);
    }
  }

  public render() {
    const { page, sorting, images } = this.state;
    const { urlFunc } = this.props;
    const isLoading = R.isNil(images);

    return (
      <React.Fragment>
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
            <Waypoint
              onEnter={this.loadNextPage(page, images, sorting, urlFunc)}
            />
          </FeedContainer>
        )}
      </React.Fragment>
    );
  }

  private loadImagesByPage = async (
    prevImages: IArtImage[],
    page: number,
    sorting: Sorting,
    url: string
  ) => {
    NProgress.start();

    const newImages = await load(url, { page, sorting });
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
    sorting: Sorting,
    url: string
  ) => () => {
    this.updateSorting(sorting);
    this.loadImagesByPage(images, page, sorting, url);
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

export { Feed, FeedContainer };
