import * as React from "react";
import * as R from "ramda";
import { ArtImage } from "../artImage";
import { FeedItemHeader } from "./feedItem/FeedItemHeader";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";
import { FeedItemFooter } from "./feedItem/FeedItemFooter";

const smallToLarge = R.replace("/small/", "/large/");

type Props = {
  innerRef?: any;
  art: ArtImage;
  loaded: boolean;
};

type State = {
  visibleMatureLayer: boolean;
};

class Image extends React.Component<Props, State> {
  state = {
    visibleMatureLayer: false
  };

  hideMatureLayer = () => {
    this.setState({
      visibleMatureLayer: false
    });
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ visibleMatureLayer: nextProps.art.adult_content });
  }

  openLargeImage = (small_image_url: string) => () => {
    window.open(smallToLarge(small_image_url));
  };

  render() {
    const { art, loaded } = this.props;
    const { cover, title } = art;
    const { visibleMatureLayer } = this.state;
    const style = {
      paddingTop: 100 / cover.aspect + "%"
    };

    return (
      <div className="image" ref={this.props.innerRef}>
        <FeedItemHeader art={art} />
        <div className="image-container" style={style}>
          {!loaded && (
            <div className="loader">
              <div className="loader-icon" />
            </div>
          )}
          {visibleMatureLayer && (
            <MatureContentLayer hideMatureLayer={this.hideMatureLayer} />
          )}
          <img
            className="cover"
            data-src={cover.medium_image_url}
            title={title}
            alt={title}
            onClick={this.openLargeImage(cover.small_image_url)}
          />
        </div>
        <FeedItemFooter art={art} />
      </div>
    );
  }
}

export { Image };
