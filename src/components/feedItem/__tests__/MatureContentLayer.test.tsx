import { mount, shallow } from "enzyme";
import * as React from "react";
import {
  IProps as IMatureContentLayerProps,
  MatureContentLayer
} from "../MatureContentLayer";

describe("<MatureContentLayer />", () => {
  it("should render the correct text", () => {
    const props: IMatureContentLayerProps = {
      onClose: () => {
        //
      }
    };

    const wrapper = mount(<MatureContentLayer {...props} />);
    expect(wrapper.find("span").text()).toBe("Mature contentClick to view");
  });

  it("should call the onClose function on click", () => {
    const props: IMatureContentLayerProps = {
      onClose: jest.fn()
    };

    const wrapper = mount(<MatureContentLayer {...props} />);
    wrapper.simulate("click");

    expect(props.onClose).toBeCalled();
  });
});
