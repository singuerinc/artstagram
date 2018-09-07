import { mount } from "enzyme";
import * as React from "react";
import { IProps as IShareButtonProps, ShareButton } from "../ShareButton";

describe("<ShareButton />", () => {
  it("should call the share onClick with the correct parameters", () => {
    const share = jest.fn();
    const props: IShareButtonProps = {
      permalink: "bar",
      share,
      title: "foo"
    };

    const wrapper = mount(<ShareButton {...props} />);

    wrapper.simulate("click");

    expect(wrapper).toBeTruthy();
    expect(share).toBeCalled();
  });
});
