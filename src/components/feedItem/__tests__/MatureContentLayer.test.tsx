import { render, screen, fireEvent } from "@testing-library/react";
import { MatureContentLayer } from "../MatureContentLayer";

describe("<MatureContentLayer />", () => {
  it("should render the correct text", () => {
    render(<MatureContentLayer onClose={() => {}} />);
    expect(screen.getByText(/Mature content/)).toBeTruthy();
    expect(screen.getByText(/Click to view/)).toBeTruthy();
  });

  it("should call the onClose function on click", () => {
    const onClose = vi.fn();
    const { container } = render(<MatureContentLayer onClose={onClose} />);

    fireEvent.click(container.firstChild as HTMLElement);

    expect(onClose).toBeCalled();
  });
});
