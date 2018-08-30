import * as React from "react";
import * as R from "ramda";
import { ArtImage } from "../artImage";
import { FeedItemHeader } from "./feedItem/FeedItemHeader";
import { Cover } from "./feedItem/Cover";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";
import { FeedItemFooter } from "./feedItem/FeedItemFooter";

type Props = {
  innerRef?: any;
  art: ArtImage;
  src: string | null;
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

  render() {
    const { art, src } = this.props;
    const { cover, title } = art;
    const { visibleMatureLayer } = this.state;
    const style = {
      paddingTop: 100 / cover.aspect + "%"
    };

    return (
      <div className="image" ref={this.props.innerRef}>
        <FeedItemHeader art={art} />
        <div className="image-container" style={style}>
          {R.isNil(src) && (
            <div className="loader">
              <div className="loader-icon" />
            </div>
          )}
          {visibleMatureLayer && (
            <MatureContentLayer hideMatureLayer={this.hideMatureLayer} />
          )}
          <Cover
            src={src}
            title={title}
            smallImageUrl={cover.small_image_url}
          />
        </div>
        <FeedItemFooter art={art} />
      </div>
    );
  }
}

export { Image };
