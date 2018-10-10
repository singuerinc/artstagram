import { mount } from "enzyme";
import * as React from "react";
import { IProps as IShareButtonProps, ShareButton } from "../ShareButton";

describe("<ShareButton />", () => {
  it("should call the share onClick with the correct parameters", () => {
    navigator.share = jest.fn(() => {
      return new Promise(() => {
        //
      });
    });

    const props: IShareButtonProps = {
      text: "baz",
      title: "foo",
      url: "bar"
    };

    const wrapper = mount(<ShareButton {...props} />);

    wrapper.simulate("click");

    expect(wrapper).toBeTruthy();
    expect(navigator.share).toBeCalledWith({
      text: "baz",
      title: "foo",
      url: "bar"
    });
  });
});
