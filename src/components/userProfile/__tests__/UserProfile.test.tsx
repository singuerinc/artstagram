import { shallow } from "enzyme";
import * as React from "react";
import { BackButton } from "../../common/BackButton";
import {
  IProps as IUserProfileProps,
  UserAvatar,
  UserCountryCityName,
  UserFullName,
  UserHeadline,
  UserProfile,
  UserProfileLink
} from "../UserProfile";
import { user } from "./user.fixture";

describe("<UserProfile />", () => {
  it("renders all children", () => {
    window.scrollTo = jest.fn();

    const props: IUserProfileProps = {
      goBack: () => {
        //
      },
      user
    };

    const wrapper = shallow(<UserProfile {...props} />);
    expect(wrapper.find(BackButton)).toHaveLength(1);
    expect(wrapper.find(UserAvatar)).toHaveLength(1);
    expect(wrapper.find(UserFullName)).toHaveLength(1);
    expect(wrapper.find(UserCountryCityName)).toHaveLength(1);
    expect(wrapper.find(UserHeadline)).toHaveLength(1);
    expect(wrapper.find(UserProfileLink)).toHaveLength(1);
  });
});
