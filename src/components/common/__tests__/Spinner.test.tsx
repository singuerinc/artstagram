import { render } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("<Spinner />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeTruthy();
  });
});
