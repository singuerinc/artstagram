import { mount } from "enzyme";
import * as React from "react";
import { IProps as IShareButtonProps, ShareButton } from "../ShareButton";

import { share } from "../share";
jest.mock("../share", () => {});

describe.skip("<ShareButton />", () => {
  it("should call the share onClick with the correct parameters", () => {
    const props: IShareButtonProps = {
      permalink: "bar",
      title: "foo"
    };

    const wrapper = mount(<ShareButton {...props} />);

    wrapper.simulate("click");

    expect(share).toBeCalled();
  });
});
