import OpenColor from "open-color";
import * as React from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  permalink: string;
}

const share = ({ title, permalink: url }: IProps) => async () => {
  // native share: only Android
  // @ts-ignore
  if (navigator.share) {
    navigator
      // @ts-ignore
      .share({
        text: "",
        title,
        url
      })
      .then(() => {
        //
      })
      .catch(() => {
        //
      });
  }
};

const ShareButton = ({ title, permalink: url }: IProps) => (
  <ShareButtonAsset onClick={share({ title, permalink: url })}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  </ShareButtonAsset>
);

const ShareButtonAsset = styled.a`
  display: block;
  margin-left: 1rem;
  color: ${OpenColor.gray[3]};
  cursor: pointer;
  transition: color 300ms;

  &:hover {
    color: ${OpenColor.gray[6]};
  }
`;

export { ShareButton, ShareButtonAsset };
