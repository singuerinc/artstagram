import { Outlet } from "@tanstack/react-router";
import { ThemeSwitch } from "./theme/ThemeSwitch";

const App = () => (
  <>
    <Outlet />
    <ThemeSwitch />
  </>
);

export { App };
