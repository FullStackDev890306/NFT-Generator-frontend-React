import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/index.scss?v=1.2.0";
import "assets/demo/demo.css";

import App from "views/App.js";
import Payment from "views/Payment.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/app"
        render={(props) => <App {...props} />}
      />
      <Route
        path="/payment"
        render={(props) => <Payment {...props}/>}
      />
      <Redirect from="/" to="/app" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);