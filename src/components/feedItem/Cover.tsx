import * as React from "react";
import styled from "styled-components";

export interface IProps {
  title: string;
  smallImageUrl: string;
  src: string | null;
  onLoad: () => void;
}

interface IState {
  loaded: boolean;
}

const smallToLarge = (x: string) =>
  x.replace(/\/[\d]+\/small_square\//, "/large/");

const openLargeImage = (smallImageUrl: string) => () => {
  window.open(smallToLarge(smallImageUrl));
};

class Cover extends React.Component<IProps, IState> {
  public state = {
    loaded: false
  };

  public render() {
    const { title, smallImageUrl, src } = this.props;
    const { loaded } = this.state;

    return (
      <StyledImage
        onLoad={this.onLoad}
        loaded={loaded}
        src={src}
        title={title}
        alt={title}
        onClick={openLargeImage(smallImageUrl)}
      />
    );
  }

  private onLoad = () => {
    this.setState({ loaded: true });
    this.props.onLoad();
  };
}

const StyledImage = styled.img`
  width: 100%;
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  opacity: ${({ loaded }: { loaded: boolean }) => (loaded ? 1 : 0)};
  transition: opacity 0.3s;
  transition-delay: 0.3s;
  cursor: pointer;
`;

export { Cover, smallToLarge, openLargeImage };
