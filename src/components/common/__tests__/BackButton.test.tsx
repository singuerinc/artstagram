import { render } from "enzyme";
import * as React from "react";
import { BackButton } from "../BackButton";

describe.skip("<BackButton />", () => {
  it("renders the text correctly", () => {
    const wrapper = render(<BackButton onClick={() => {}} />);
    expect(wrapper.text()).toBe("foo");
  });

  it("renders returns 'Community' any time the title is randomize", () => {
    const wrapper = render(<BackButton onClick={() => {}} />);
    expect(wrapper.text()).toBe("community");
  });
});
