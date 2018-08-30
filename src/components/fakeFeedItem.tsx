import * as React from "react";
import styled from "styled-components";
import { ArtTitle, Footer } from "./feedItem/FeedItemFooter";
import { StyledNavLink, UserFullName } from "./feedItem/FeedItemHeader";

const FakeFeedItem = () => (
  <FakeFeedItemWrapper>
    <div className="image">
      <StyledNavLink to="">
        <FakeAvatar />
        <UserFullName />
      </StyledNavLink>
      <div className="image-container" />
      <Footer>
        <ArtTitle />
      </Footer>
    </div>
  </FakeFeedItemWrapper>
);

const FakeAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
`;

const FakeFeedItemWrapper = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: #fff;
  color: black;
  margin: 1rem 0;
  position: relative;

  ${UserFullName} {
    background-color: rgba(0, 0, 0, 0.05);
    width: 100px;
    height: 18px;
  }

  .image-container {
    position: relative;
    padding-top: 75%;
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${StyledNavLink} {
    pointer-events: none;
    &::before {
      border: 2px solid rgba(0, 0, 0, 0.05);
    }
  }

  ${ArtTitle} {
    background-color: rgba(0, 0, 0, 0.05);
    width: 250px;
    height: 18px;
  }

  @media only screen and (min-width: 48rem) {
    &:first-child {
      margin: 0 0 1rem;
    }
  }
`;

export { FakeFeedItem };
