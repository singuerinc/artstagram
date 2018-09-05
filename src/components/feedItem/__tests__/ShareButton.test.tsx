import { mount, shallow } from "enzyme";
import * as React from "react";
jest.mock("../ShareButton");
import {
  IProps as IShareButtonProps,
  share,
  ShareButton
} from "../ShareButton";

describe.skip("<ShareButton />", () => {
  it("should call the share onClick with the correct parameters", () => {
    const props: IShareButtonProps = {
      permalink: "bar",
      title: "foo"
    };

    const wrapper = mount(<ShareButton {...props} />);
    wrapper.simulate("click");

    expect(share).toBeCalled();
    // const a = wrapper.getDOMNode() as HTMLImageElement;

    // expect(a.getAttribute("alt")).toBe("foo");
  });
});
