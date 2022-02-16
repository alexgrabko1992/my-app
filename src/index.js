import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import config from "./config";
import { App } from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
    audience={config.audience}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
