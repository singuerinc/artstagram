import * as React from "react";
import ScrollOut from "scroll-out";
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
  private scroll;
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
    const notAdult = (x: ArtImage) => !x.adult_content;

    const add = compose(
      filter(notAdult),
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
    load(NETLIFY_LAMBDA_FETCH, { page, sorting }).then(
      this.addImagesInPage(prevImages, page + 1)
    );
  };

  componentDidMount() {
    const { page, sorting } = this.state;

    // load first page
    this.loadImagesByPage([], page, sorting);
  }

  componentWillUnmount() {
    this.scroll.teardown();
  }

  render() {
    const { page, sorting, images } = this.state;
    const lastIndex = images.length - 1;

    const asItem = lastIdx => (art: ArtImage, idx: number) => {
      const { id } = art;
      const nextPage = lastIdx === idx ? page : null;
      const className = lastIdx === idx ? "item last" : "item";

      return (
        <li key={id} data-next-page={nextPage} className={className}>
          <Image art={art} />
        </li>
      );
    };

    try {
      this.scroll.teardown();
    } catch (error) {}

    this.scroll = ScrollOut({
      targets: ".last",
      percentVisible: 0.1,
      once: true,
      onShown: el => {
        const page = parseInt(el.attributes["data-next-page"].value, 10);
        // load next page
        this.loadImagesByPage(images, page, sorting);
      }
    });

    const listItems = mapIndexed(asItem(lastIndex), images);

    return (
      <React.Fragment>
        <h3 className="cat-title">{title(sorting)}</h3>
        <Nav sorting={sorting} />
        <ul className="collection" ref={this.list}>
          {listItems}
        </ul>
      </React.Fragment>
    );
  }
}

export { App };
