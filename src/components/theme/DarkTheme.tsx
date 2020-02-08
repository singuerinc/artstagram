import * as OpenColor from "open-color";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import { StyledTitle } from "../feed/Title";
import {
  FakeAvatar,
  FakeFeedItemWrapper,
  ImageContainer as FakeImageContainer
} from "../feedItem/FakeFeedItem";
import { FeedItemContainer } from "../feedItem/FeedItem";
import { ArtTitle } from "../feedItem/FeedItemFooter";
import {
  Avatar,
  StyledNavLink,
  UserFullName,
  UserName
} from "../feedItem/FeedItemHeader";
import { ImageContainer } from "../Image";
import { StyledNavLink as NavStyledNavLink } from "../NavBar";

export function Theme() {
  const Dark = createGlobalStyle`
    html, body {
      background-color: ${OpenColor.gray[9]};
    }

    ${FeedItemContainer}{
      background-color: transparent;

      @media only screen and (min-width: 48rem) {
        box-shadow: 0 0 3em #0000007a;
        border: 1px solid ${OpenColor.gray[9]};
      }
    }

    ${Avatar}{
      filter: grayscale(50%);
      opacity: 0.3;
    }

    ${StyledNavLink}{
      color: ${OpenColor.gray[8]};

      &:hover {
        color: ${OpenColor.gray[7]};
      }

      &::before {
        border-color: transparent;
      }
    }

    ${NavStyledNavLink}{
      @media only screen and (min-width: 48rem) {
        &.selected {
          color: ${OpenColor.gray[1]};
        }
      }
    }

    ${ArtTitle}, ${UserFullName}{
      color: ${OpenColor.gray[6]};
    }

    ${StyledTitle}{
      color: ${OpenColor.gray[3]};
      background-color: transparent;
    }

    ${FakeFeedItemWrapper} {
      @media only screen and (min-width: 48rem) {
        box-shadow: 0 0 3em black;
        border: 1px solid ${OpenColor.gray[9]};
      }

      ${UserFullName}, ${UserName}, ${FakeAvatar}{
        background-color: ${OpenColor.gray[9]};
      }

      ${StyledNavLink}{
        &::before {
          border-color: ${OpenColor.gray[9]};
        }
      }

      ${ArtTitle}{
        background-color: ${OpenColor.gray[9]};
      }
    }

    ${FakeImageContainer}, ${ImageContainer}, ${FakeFeedItemWrapper} {
      background-color: transparent;
    }
  `;

  return <Dark />;
}

interface IProps {
  onClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}

export function Icon({ onClick }: IProps) {
  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
