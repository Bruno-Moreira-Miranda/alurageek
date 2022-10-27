import ReactDOM from "react-dom/client";

import serverInit from "mock/server";

import "./styles/index.css";

import App from "./App";

serverInit();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <App />
);