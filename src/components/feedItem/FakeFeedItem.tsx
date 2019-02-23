import * as OpenColor from "open-color";
import * as React from "react";
import styled from "styled-components";
import { ArtTitle, Footer } from "./FeedItemFooter";
import { StyledNavLink, UserFullName, UserName } from "./FeedItemHeader";

const FakeFeedItem = () => (
  <FakeFeedItemWrapper>
    <>
      <StyledNavLink to="">
        <FakeAvatar />
        <UserFullName />
        <UserName />
      </StyledNavLink>
      <ImageContainer />
      <Footer>
        <ArtTitle />
      </Footer>
    </>
  </FakeFeedItemWrapper>
);

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  background-color: ${OpenColor.gray[1]};
`;

const FakeAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${OpenColor.gray[1]};
`;

const FakeFeedItemWrapper = styled.li`
  border-radius: 3px;
  width: 100%;
  background-color: ${OpenColor.white};
  color: black;
  margin: 1rem 0;
  position: relative;

  ${UserFullName} {
    background-color: ${OpenColor.gray[1]};
    width: 100px;
    height: 18px;
  }

  ${UserName} {
    background-color: ${OpenColor.gray[1]};
    width: 70px;
    height: 18px;
  }

  ${StyledNavLink} {
    pointer-events: none;
    &::before {
      border: 2px solid ${OpenColor.gray[1]};
    }
  }

  ${ArtTitle} {
    background-color: ${OpenColor.gray[1]};
    width: 250px;
    height: 18px;
  }

  @media only screen and (min-width: 48rem) {
    border: 1px solid ${OpenColor.gray[3]};
    &:first-child {
      margin: 0 0 1rem;
    }
  }
`;

export { FakeFeedItem, FakeFeedItemWrapper, ImageContainer, FakeAvatar };
