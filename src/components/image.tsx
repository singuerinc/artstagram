import * as React from "react";
import { IArtImage } from "../IArtImage";
import { Spinner } from "./common/Spinner";
import { Cover } from "./feedItem/Cover";
import { FeedItemFooter } from "./feedItem/FeedItemFooter";
import { FeedItemHeader } from "./feedItem/FeedItemHeader";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";

interface IProps {
  innerRef?: any;
  art: IArtImage;
  src: string | null;
}

interface IState {
  visibleMatureLayer: boolean;
  loaded: boolean;
}

class Image extends React.Component<IProps, IState> {
  public state = {
    loaded: false,
    visibleMatureLayer: false
  };

  public hideMatureLayer = () => {
    this.setState(() => ({
      visibleMatureLayer: false
    }));
  };

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ visibleMatureLayer: nextProps.art.adult_content });
  }

  public render() {
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
