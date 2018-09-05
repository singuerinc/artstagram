import { mount } from "enzyme";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Avatar,
  FeedItemHeader,
  IProps as IFeedItemHeaderProps,
  StyledNavLink,
  UserFullName,
  UserName
} from "../FeedItemHeader";
import { art } from "./art.fixture";

describe("<FeedItemHeader />", () => {
  it("should render props", () => {
    art.user.username = "johndoe";
    art.user.full_name = "John Doe";
    art.user.medium_avatar_url = "https://ava.tar/johndoe.jpg";

    const props: IFeedItemHeaderProps = {
      art,
      user: art.user
    };

    const wrapper = mount(
      <BrowserRouter>
        <FeedItemHeader {...props} />
      </BrowserRouter>
    );

    expect(wrapper.find(StyledNavLink).prop("to")).toEqual({
      pathname: `/user/johndoe`,
      state: { art: props.art, user: props.user }
    });
    expect(wrapper.find(UserFullName).text()).toBe("John Doe");
    expect(wrapper.find(UserName).text()).toBe("@johndoe");
    expect(wrapper.find(Avatar).props()).toEqual({
      alt: "@johndoe",
      src: "https://ava.tar/johndoe.jpg",
      title: "@johndoe"
    });
  });
});
