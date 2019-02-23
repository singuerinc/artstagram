import { mount } from "enzyme";
import * as React from "react";
import { Spinner } from "../common/Spinner";
import { art } from "../feedItem/__tests__/art.fixture";
import { MatureContentLayer } from "../feedItem/MatureContentLayer";
import { Image, IProps as IImageProps } from "../Image";

describe("<Image />", () => {
  it("should render the spinner when the image is not loaded", () => {
    const props: IImageProps = {
      art,
      src: null
    };
    const wrapper = mount(<Image {...props} />);

    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it.skip("should not render the spinner when the image is loaded", () => {
    const props: IImageProps = {
      art,
      src: null
    };
    const wrapper = mount(<Image {...props} />);
    wrapper.setState({ loaded: true });

    expect(wrapper.find(Spinner)).toHaveLength(0);
  });

  it.skip("should render the mature content layer when adult_content is true", () => {
    const props: IImageProps = {
      art,
      src: null
    };
    const wrapper = mount(<Image {...props} />);
    wrapper.setState({ mature: true });

    expect(wrapper.find(MatureContentLayer)).toHaveLength(1);
  });

  it.skip("should not render the mature content layer when adult_content is false", () => {
    const props: IImageProps = {
      art,
      src: null
    };
    const wrapper = mount(<Image {...props} />);
    wrapper.setState({ mature: false });

    expect(wrapper.find(MatureContentLayer)).toHaveLength(0);
  });

  it.skip("should set mature to false after calling hideMatureLayer", () => {
    const props: IImageProps = {
      art,
      src: null
    };
    const wrapper = mount(<Image {...props} />);
    wrapper.setState({ mature: true });
    // @ts-ignore
    wrapper.hideMatureLayer();

    // @ts-ignore
    expect(wrapper.state().mature).toBeTruthy();
  });
});
