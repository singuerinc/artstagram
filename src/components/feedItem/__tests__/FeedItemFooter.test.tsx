import { mount } from "enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  ArtTitle,
  FeedItemFooter,
  IProps as IFeedItemFooterProps
} from "../FeedItemFooter";
import { ShareButton } from "../ShareButton";
import { art } from "./art.fixture";

describe("<FeedItemFooter />", () => {
  it("should render children and props", () => {
    navigator.share = jest.fn();
    art.permalink = "https://foo.bar/artwork/awesome";
    art.title = "foo &amp; bar";

    const props: IFeedItemFooterProps = {
      art
    };

    const wrapper = mount(
      <BrowserRouter>
        <FeedItemFooter {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find(ArtTitle).text()).toBe("foo & bar");
    expect(wrapper.find(ShareButton).props()).toEqual({
      permalink: "https://foo.bar/artwork/awesome",
      title: "foo &amp; bar"
    });
  });
});
