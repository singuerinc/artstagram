import { render } from "enzyme";
import * as React from "react";
import { Spinner } from "../Spinner";

describe.skip("<Spinner />", () => {
  it("renders correctly", () => {
    const tree = render(<Spinner />);
    expect(tree).toMatchSnapshot();
  });
});
