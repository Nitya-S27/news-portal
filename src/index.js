import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import NewsDetail from "./containers/NewsDetail";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/newsDetail">
        <NewsDetail />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
