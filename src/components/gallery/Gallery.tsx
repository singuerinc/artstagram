import * as R from "ramda";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";

interface IProps {
  gallery: IArtImage[];
}

interface IState {
  index: number;
}

class Gallery extends React.Component<IProps, IState> {
  public state = {
    index: 0
  };

  public render() {
    const { index } = this.state;
    const { gallery } = this.props;

    return (
      <GalleryWrapper>
        {/* <GalleryDots>
          {R.addIndex(R.map)(
            (x, idx) => (
              <GalleryDot key={idx} selected={R.equals(idx, index)} />
            ),
            gallery
          )}
        </GalleryDots> */}
        <GalleryNumber>
          {index + 1}/{gallery.length - 1}
        </GalleryNumber>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          enableMouseEvents={true}
        >
          {R.map(
            (x: IArtImage) => (
              <GalleryImage
                key={x.id}
                src={x.cover.small_square_url}
                alt={x.title}
              />
            ),
            gallery
          )}
        </SwipeableViews>
      </GalleryWrapper>
    );
  }

  private handleChangeIndex = (index: number) => {
    this.setState({ index });
  };
}

const GalleryNumber = styled.div`
  text-align: right;
  width: 100%;
  padding: 0 1rem;
  position: absolute;
  top: 0;
  margin: 1.3rem 0;
  color: lightgrey;
  pointer-events: none;
`;

const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const GalleryDots = styled.ul`
  margin: 0 1rem 1rem;
  padding: 0;
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
`;

const GalleryDot = styled.li`
  width: 5px;
  height: 5px;
  margin: 3px;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? "#111" : "#ccc"};
  border-radius: 50%;
`;

const GalleryImage = styled.img`
  width: 100%;
`;

export { Gallery };
