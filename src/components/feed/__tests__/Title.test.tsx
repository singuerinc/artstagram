import { render, screen } from "@testing-library/react";
import { communitify, Title } from "../Title";

describe("<Title />", () => {
  it("renders the text correctly", () => {
    render(<Title title="foo" />);
    expect(screen.getByText("foo")).toBeTruthy();
  });

  it("renders 'community' any time the title is randomize", () => {
    render(<Title title="randomize" />);
    expect(screen.getByText("community")).toBeTruthy();
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
