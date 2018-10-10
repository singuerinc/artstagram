import { mount } from "enzyme";
import * as React from "react";
import {
  ArtTitle,
  FeedItemFooter,
  IProps as IFeedItemFooterProps
} from "../FeedItemFooter";
import { ShareButton } from "../ShareButton";
import { art } from "./art.fixture";

describe("<FeedItemFooter />", () => {
  it("should render children and props", () => {
    art.permalink = "https://foo.bar/artwork/awesome";
    art.title = "foo &amp; bar";
    art.description = "foz &amp; baz";

    // @ts-ignore
    navigator.share = jest.fn(() => {
      return new Promise(() => {
        //
      });
    });

    const props: IFeedItemFooterProps = {
      art
    };

    const wrapper = mount(<FeedItemFooter {...props} />);

    expect(wrapper.find(ArtTitle).text()).toBe("foo & bar");
    expect(wrapper.find(ShareButton).props()).toEqual({
      shareFn: navigator.share,
      text: "foz &amp; baz",
      title: "foo &amp; bar",
      url: "https://foo.bar/artwork/awesome"
    });
  });
});
