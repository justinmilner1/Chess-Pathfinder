import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
console.log("in index.js");
ReactDom.render(<App />, document.getElementById("root"));
console.log("after log index.js");
