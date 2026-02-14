import { render, fireEvent } from "@testing-library/react";
import { IProps as IShareButtonProps, ShareButton } from "../ShareButton";

describe("<ShareButton />", () => {
  it("should call the share onClick with the correct parameters", () => {
    navigator.share = vi.fn(() => {
      return new Promise(() => {});
    });

    const props: IShareButtonProps = {
      text: "baz",
      title: "foo",
      url: "bar"
    };

    const { container } = render(<ShareButton {...props} />);

    fireEvent.click(container.firstChild as HTMLElement);

    expect(navigator.share).toBeCalledWith({
      text: "baz",
      title: "foo",
      url: "bar"
    });
  });
});
