import { mount } from "enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { FakeAvatar, FakeFeedItem, ImageContainer } from "../FakeFeedItem";
import { ArtTitle } from "../FeedItemFooter";
import { UserFullName, UserName } from "../FeedItemHeader";

describe("<FakeFeedItem />", () => {
  it("should render children and props", () => {
    const wrapper = mount(
      <BrowserRouter>
        <FakeFeedItem />
      </BrowserRouter>
    );

    expect(wrapper.find(FakeAvatar)).toHaveLength(1);
    expect(wrapper.find(UserFullName)).toHaveLength(1);
    expect(wrapper.find(UserName)).toHaveLength(1);
    expect(wrapper.find(ImageContainer)).toHaveLength(1);
    expect(wrapper.find(ArtTitle)).toHaveLength(1);
  });
});
