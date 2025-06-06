import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 記得這邊要有 Tailwind CSS 設定
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
