import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import "./styles.css";

ReactDOM.render(<App />, document.getElementById("root"));

navigator.serviceWorker.register("./services/service-worker.js");
