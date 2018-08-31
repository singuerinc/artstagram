import * as React from "react";
import styled from "styled-components";
import { ArtTitle, Footer } from "./feedItem/FeedItemFooter";
import {
  StyledNavLink,
  UserFullName,
  UserName
} from "./feedItem/FeedItemHeader";

const FakeFeedItem = () => (
  <FakeFeedItemWrapper>
    <div>
      <StyledNavLink to="">
        <FakeAvatar />
        <UserFullName />
        <UserName />
      </StyledNavLink>
      <ImageContainer />
      <Footer>
        <ArtTitle />
      </Footer>
    </div>
  </FakeFeedItemWrapper>
);

const ImageContainer = styled.div`
  position: relative;
  padding-top: 75%;
  background-color: rgba(0, 0, 0, 0.03);
`;

const FakeAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.03);
`;

const FakeFeedItemWrapper = styled.li`
  width: 100%;
  background-color: #fff;
  color: black;
  margin: 1rem 0;
  position: relative;

  ${UserFullName} {
    background-color: rgba(0, 0, 0, 0.03);
    width: 100px;
    height: 18px;
  }

  ${UserName} {
    background-color: rgba(0, 0, 0, 0.03);
    width: 70px;
    height: 18px;
  }

  ${StyledNavLink} {
    pointer-events: none;
    &::before {
      border: 2px solid rgba(0, 0, 0, 0.03);
    }
  }

  ${ArtTitle} {
    background-color: rgba(0, 0, 0, 0.03);
    width: 250px;
    height: 18px;
  }

  @media only screen and (min-width: 48rem) {
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:first-child {
      margin: 0 0 1rem;
    }
  }
`;

export { FakeFeedItem };
