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

  const Wapper = styled.div`
    position: fixed;
    bottom: 2em;
    right: 2em;
  `;

  console.log("theme", theme);

  return (
    <Wapper>
      {theme === Theme.DEFAULT && (
        <>
          <DefaultThemeIcon onClick={() => setTheme(Theme.DARK)} />
          <DefaultTheme />
        </>
      )}
      {theme === Theme.DARK && (
        <>
          <DarkThemeIcon onClick={() => setTheme(Theme.DEFAULT)} />
          <DarkTheme />
        </>
      )}
    </Wapper>
  );
}
