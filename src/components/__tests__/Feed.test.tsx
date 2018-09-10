import { mount, render } from "enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { data as images } from "../../__mocks__/remote.fixture";
import { Feed, IProps as IFeedProps } from "../Feed";
import { FakeFeedItem } from "../feedItem/FakeFeedItem";
import { FeedItem } from "../feedItem/FeedItem";

describe("<Feed />", () => {
  it("should render the fake Feed when the images are not loaded", () => {
    const props: IFeedProps = {
      urlFunc: ""
    };

    Feed.prototype.componentDidMount = jest.fn();

    const wrapper = mount(
      <BrowserRouter>
        <Feed {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find(FakeFeedItem)).toHaveLength(2);
    expect(wrapper.find(FeedItem)).toHaveLength(0);
  });

  it.skip("should render the real Feed when the images are loaded", () => {
    const props: IFeedProps = {
      urlFunc: ""
    };

    Feed.prototype.componentDidMount = jest.fn();

    const wrapper = mount(
      <BrowserRouter>
        <Feed {...props} />
      </BrowserRouter>
    );

    wrapper.setState({ page: 1, images }, () => {
      expect(wrapper.find(FakeFeedItem)).toHaveLength(0);
      expect(wrapper.find(FeedItem)).toHaveLength(50);
    });
  });
});
