import * as React from "react";
import ScrollOut from "scroll-out";
import { addIndex, concat, filter, map } from "ramda";
import { load } from "./art";
import { ArtImage } from "./artImage";
import { Nav } from "./nav";

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
    sorting: "picks",
    images: [] as ArtImage[]
  };

  constructor(props) {
    super(props);
    this.list = React.createRef();
  }

  openLargeImage = (small_image_url: string) => {
    const largeFrom = (x: string) => x.replace("/small/", "/large/");

    window.open(largeFrom(small_image_url));
  };

  updateSorting = (sorting: string) => {
    this.setState(prevState => ({
      ...prevState,
      sorting
    }));
  };

  updatePage = (page: number) => (newImages: ArtImage[]): ArtImage[] => {
    this.setState(prevState => ({
      ...prevState,
      page
    }));

    return newImages;
  };

  addImages = (images: ArtImage[]) => (newImages: ArtImage[]) => {
    const notAdult = (x: ArtImage) => !x.adult_content;
    this.setState(prevState => {
      return {
        ...prevState,
        images: concat(images, filter(notAdult, newImages))
      };
    });
  };

  loadImagesByPage = (images: ArtImage[], page: number, sorting: string) => {
    console.log({ page, sorting });
    load(`.netlify/functions/fetch?page=${page}&sorting=${sorting}`)
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

    const asItem = lastIdx => (
      { id, title, cover, permalink }: ArtImage,
      idx: number
    ) => (
      <li
        key={id}
        data-next-page={lastIdx === idx ? page : null}
        className={lastIdx === idx ? "item last" : "item"}
        onClick={() => {
          this.openLargeImage(cover.small_image_url);
        }}
      >
        <img src={cover.medium_image_url} />
        <h1 className="title">{title}</h1>
      </li>
    );

    try {
      this.scroll.teardown();
    } catch (error) {}

    this.scroll = ScrollOut({
      targets: ".last",
      percentVisible: 0.1,
      once: true,
      onShown: el => {
        const page = parseInt(el.attributes["data-next-page"].value, 10);
        console.log("load new page", { page });
        // load next page
        this.loadImagesByPage(images, page, sorting);
      }
    });

    return (
      <React.Fragment>
        <Nav
          onClick={(sorting: string) => {
            this.updateSorting(sorting);
            this.loadImagesByPage([], 1, sorting);
          }}
        />
        <ul className="collection" ref={this.list}>
          {mapIndexed(asItem(lastIndex), images)}
        </ul>
      </React.Fragment>
    );
  }
}

export { App };
