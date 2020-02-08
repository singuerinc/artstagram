import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Icon as DarkThemeIcon, Theme as DarkTheme } from "./DarkTheme";
import {
  Icon as DefaultThemeIcon,
  Theme as DefaultTheme
} from "./DefaultTheme";

enum Theme {
  DEFAULT = "default",
  DARK = "dark"
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState(Theme.DARK);

  return (
    <Wrapper>
      {theme === Theme.DEFAULT && (
        <>
          <DarkThemeIcon onClick={() => setTheme(Theme.DARK)} />
          <DefaultTheme />
        </>
      )}
      {theme === Theme.DARK && (
        <>
          <DefaultThemeIcon onClick={() => setTheme(Theme.DEFAULT)} />
          <DarkTheme />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: none;
  @media only screen and (min-width: 48rem) {
    display: flex;
    position: fixed;
    bottom: 2em;
    right: 2em;
    width: 2.5em;
    height: 2.5em;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.4s ease;

    &:hover {
      opacity: 0.2;
    }
  }
`;
