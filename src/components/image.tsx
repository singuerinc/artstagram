import * as React from "react";
import * as R from "ramda";
import { ArtImage } from "../artImage";
import { FeedItemHeader } from "./feedItem/FeedItemHeader";
import { Cover } from "./feedItem/Cover";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";
import { FeedItemFooter } from "./feedItem/FeedItemFooter";
import { Spinner } from "./common/Spinner";

type Props = {
  innerRef?: any;
  art: ArtImage;
  src: string | null;
};

type State = {
  visibleMatureLayer: boolean;
  loaded: boolean;
};

class Image extends React.Component<Props, State> {
  state = {
    visibleMatureLayer: false,
    loaded: false
  };

  hideMatureLayer = () => {
    this.setState(() => ({
      visibleMatureLayer: false
    }));
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ visibleMatureLayer: nextProps.art.adult_content });
  }

  render() {
    const { art, src } = this.props;
    const { cover, title } = art;
    const { visibleMatureLayer, loaded } = this.state;
    const style = {
      paddingTop: 100 / cover.aspect + "%"
    };

    return (
      <div className="image" ref={this.props.innerRef}>
        <FeedItemHeader art={art} />
        <div className="image-container" style={style}>
          {!loaded && <Spinner />}
          {visibleMatureLayer && (
            <MatureContentLayer hideMatureLayer={this.hideMatureLayer} />
          )}
          <Cover
            onLoad={() => {
              this.setState(() => ({
                loaded: true
              }));
            }}
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
