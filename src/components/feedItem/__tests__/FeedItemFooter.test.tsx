import { render, screen } from "@testing-library/react";
import {
  FeedItemFooter,
  IProps as IFeedItemFooterProps
} from "../FeedItemFooter";
import { art } from "./art.fixture";

describe("<FeedItemFooter />", () => {
  it("should render children and props", () => {
    art.permalink = "https://foo.bar/artwork/awesome";
    art.title = "foo &amp; bar";
    art.description = "foz &amp; baz";

    // @ts-ignore
    navigator.share = vi.fn(() => {
      return new Promise(() => {});
    });

    const props: IFeedItemFooterProps = {
      art
    };

    const { container } = render(<FeedItemFooter {...props} />);

    // The title is rendered as HTML (dangerouslySetInnerHTML), so &amp; becomes &
    expect(container.querySelector("p")!.textContent).toBe("foo & bar");
  });
});
