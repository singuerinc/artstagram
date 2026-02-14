import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

navigator.serviceWorker.register("./services/service-worker.js");
