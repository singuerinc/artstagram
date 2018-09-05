import { render } from "enzyme";
import * as React from "react";
import { communitify, Title } from "../Title";

describe("<Title />", () => {
  it("renders the text correctly", () => {
    const wrapper = render(<Title title="foo" />);
    expect(wrapper.text()).toBe("foo");
  });

  it("renders returns 'Community' any time the title is randomize", () => {
    const wrapper = render(<Title title="randomize" />);
    expect(wrapper.text()).toBe("community");
  });
});

describe("communitify", () => {
  it("should return the same value if the input is not randomize", () => {
    expect(communitify("foo")).toBe("foo");
  });

  it("should return 'community' if the input is randomize", () => {
    expect(communitify("randomize")).toBe("community");
  });
});
