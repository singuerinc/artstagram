import * as React from "react";
import ScrollOut from "scroll-out";
import { addIndex, concat, map } from "ramda";
import { load } from "./art";
import { ArtImage } from "./artImage";
import { Nav } from "./nav";

const mapIndexed = addIndex(map);

type State = {
  page: number;
  images: ArtImage[];
};

class App extends React.Component<{}, State> {
  private scroll;
  private list;

  state = {
    page: 1,
    images: [] as ArtImage[]
  };

  constructor(props) {
    super(props);
    this.list = React.createRef();
  }

  updatePage = (page: number) => (newImages: ArtImage[]): ArtImage[] => {
    this.setState(prevState => ({
      ...prevState,
      page
    }));

    return newImages;
  };

  addImages = (images: ArtImage[]) => (newImages: ArtImage[]) => {
    console.log("more images", images.length, newImages.length);
    this.setState(prevState => {
      return {
        ...prevState,
        images: concat(images, newImages)
      };
    });
  };

  loadImagesByPage = (images: ArtImage[], page: number) => {
    load(`.netlify/functions/fetch?page=${page}&sorting=picks`)
      .then(this.updatePage(page + 1))
      .then(this.addImages(images));
  };

  componentDidMount() {
    const { page } = this.state;

    // load first page
    this.loadImagesByPage([], page);
  }

  componentWillUnmount() {
    this.scroll.teardown();
  }

  render() {
    const { page, images } = this.state;
    const lastIndex = images.length - 1;

    const asItem = lastIdx => (
      { id, title, adult_content, src }: ArtImage,
      idx: number
    ) => (
      <li
        key={id}
        data-next-page={lastIdx === idx ? page : null}
        className={lastIdx === idx ? "item last" : "item"}
      >
        <img src={src} />
        <h1 className="title">{title}</h1>
      </li>
    );

    try {
      this.scroll.teardown();
    } catch (error) {}

    this.scroll = ScrollOut({
      targets: ".last",
      percentVisible: 0.2,
      once: true,
      onShown: el => {
        const page = parseInt(el.attributes["data-next-page"].value, 10);
        console.log("load new page", { page });
        // load next page
        this.loadImagesByPage(images, page);
      }
    });

    return (
      <React.Fragment>
        <Nav onClick={(sorting: string) => {}} />
        <ul className="collection" ref={this.list}>
          {mapIndexed(asItem(lastIndex), images)}
        </ul>
      </React.Fragment>
    );
  }
}

export { App };
