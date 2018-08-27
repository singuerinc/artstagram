import * as React from "react";
import ScrollOut from "scroll-out";
import { addIndex, concat, filter, compose, prop, uniqBy, map } from "ramda";
import { load } from "./art";
import { ArtImage } from "./artImage";
import { Nav } from "./nav";
import { Image } from "./image";

const mapIndexed = addIndex(map);

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
    sorting: "latest",
    images: [] as ArtImage[]
  };

  constructor(props) {
    super(props);
    this.list = React.createRef();

    const params = new URLSearchParams(document.location.search);
    if (params.has("sorting")) {
      this.state.sorting = params.get("sorting");
    }
  }

  updateSorting = (sorting: string) => {
    this.setState({ sorting });
  };

  updatePage = (page: number) => (images: ArtImage[]): ArtImage[] => {
    this.setState({ page });

    // FIXME: feels weird
    return images;
  };

  addImages = (prevImages: ArtImage[]) => (newImages: ArtImage[]) => {
    const withCover = (x: ArtImage) => !!x.cover;
    const notAdult = (x: ArtImage) => !x.adult_content;

    const add = compose(
      filter(notAdult),
      filter(withCover),
      uniqBy(prop("id")),
      concat(prevImages)
    );

    this.setState({
      images: add(newImages)
    });
  };

  loadImagesByPage = (images: ArtImage[], page: number, sorting: string) => {
    load(`.netlify/functions/fetch`, { page, sorting })
      .then(this.updatePage(page + 1))
      .then(this.addImages(images));
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
        <Nav selected={sorting} />
        <ul className="collection" ref={this.list}>
          {listItems}
        </ul>
      </React.Fragment>
    );
  }
}

export { App };
