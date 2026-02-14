import { render, fireEvent } from "@testing-library/react";
import { BackButton } from "../BackButton";

describe("<BackButton />", () => {
  it("renders a button element", () => {
    const { container } = render(<BackButton onClick={() => {}} />);
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    const { container } = render(<BackButton onClick={onClick} />);
    const button = container.querySelector("button")!;
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
