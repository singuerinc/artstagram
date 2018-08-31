import * as React from "react";
import { IArtImage } from "../IArtImage";
import { Spinner } from "./common/Spinner";
import { Cover } from "./feedItem/Cover";
import { FeedItemFooter } from "./feedItem/FeedItemFooter";
import { FeedItemHeader } from "./feedItem/FeedItemHeader";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";
import styled from "styled-components";

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
    const paddingTop = cover => 100 / cover.aspect + "%";

    return (
      <div ref={this.props.innerRef}>
        <FeedItemHeader art={art} />
        <ImageContainer paddingtop={paddingTop(cover)}>
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
        </ImageContainer>
        <FeedItemFooter art={art} />
      </div>
    );
  }
}

const ImageContainer = styled.div.attrs<{ paddingtop: string }>({
  paddingtop: props => props.paddingtop
})`
  position: relative;
  background-color: rgba(0, 0, 0, 0.05);
  padding-top: ${({ paddingtop }) => paddingtop};
`;

export { Image };
