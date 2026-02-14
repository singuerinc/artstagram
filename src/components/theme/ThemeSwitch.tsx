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

const STORAGE_KEY = "artstagram-theme";

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === Theme.DEFAULT ? Theme.DEFAULT : Theme.DARK;
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState(getStoredTheme);

  const switchTheme = (next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  return (
    <Wrapper>
      {theme === Theme.DEFAULT && (
        <>
          <DarkThemeIcon onClick={() => switchTheme(Theme.DARK)} />
          <DefaultTheme />
        </>
      )}
      {theme === Theme.DARK && (
        <>
          <DefaultThemeIcon onClick={() => switchTheme(Theme.DEFAULT)} />
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
