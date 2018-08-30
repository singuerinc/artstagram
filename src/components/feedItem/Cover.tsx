import * as R from "ramda";
import * as React from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  smallImageUrl: string;
  src: string | null;
  onLoad: () => void;
}

interface IState {
  loaded: boolean;
}

const smallToLarge = R.replace("/small/", "/large/");

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
        onLoad={() => {
          this.props.onLoad();
          this.setState(() => ({
            loaded: true
          }));
        }}
        loaded={loaded}
        src={src}
        title={title}
        alt={title}
        onClick={openLargeImage(smallImageUrl)}
      />
    );
  }
}

const StyledImage = styled.img.attrs<{ loaded: boolean }>({
  src: props => props.loaded
})`
  width: 100%;
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  opacity: ${props => (props.loaded ? 1 : 0)};
  transition: opacity 0.3s;
  transition-delay: 0.3s;
  cursor: pointer;
`;

export { Cover };
