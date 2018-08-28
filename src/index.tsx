import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles.css";
import { App } from "./components/app";

ReactDOM.render(<App />, document.getElementById("root"));

navigator.serviceWorker.register("./services/service-worker.js");
