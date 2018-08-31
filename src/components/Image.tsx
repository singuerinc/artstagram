import * as React from "react";
import styled from "styled-components";
import { IArtImage } from "../IArtImage";
import { Spinner } from "./common/Spinner";
import { Cover } from "./feedItem/Cover";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";

interface IProps {
  innerRef?: any;
  art: IArtImage;
  src: string | null;
}

interface IState {
  mature: boolean;
  loaded: boolean;
}

const paddingTop = x => 100 / x.aspect + "%";

class Image extends React.Component<IProps, IState> {
  public state = {
    loaded: false,
    mature: false
  };

  public hideMatureLayer = () => {
    this.setState({ mature: false });
  };

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ mature: nextProps.art.adult_content });
  }

  public render() {
    const {
      art: { cover, title },
      src
    } = this.props;
    const { mature, loaded } = this.state;

    return (
      <div ref={this.props.innerRef}>
        <ImageContainer pt={paddingTop(cover)}>
          {!loaded && <Spinner />}
          {mature && <MatureContentLayer onClose={this.hideMatureLayer} />}
          <Cover
            onLoad={this.onLoad}
            src={src}
            title={title}
            smallImageUrl={cover.small_image_url}
          />
        </ImageContainer>
      </div>
    );
  }

  private onLoad = () => {
    this.setState({ loaded: true });
  };
}

const ImageContainer = styled.div.attrs<{ pt: string }>({
  pt: ({ pt }) => pt
})`
  position: relative;
  background-color: rgba(0, 0, 0, 0.05);
  padding-top: ${({ pt }) => pt};
`;

export { Image };
