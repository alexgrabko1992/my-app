import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import config from "./config";
import { App } from "./components/App";
import "./index.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjauk6BuwNve9AQbb_bdRrjCGBQmICdNU",
  authDomain: "my-app-53709.firebaseapp.com",
  databaseURL:
    "https://my-app-53709-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-53709",
  storageBucket: "my-app-53709.appspot.com",
  messagingSenderId: "52917285907",
  appId: "1:52917285907:web:92089489fe4e279c11bbe6",
  measurementId: "G-F39BTN0QQ5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={window.location.origin}
    audience="https://beautifulapp.eu.auth0.com/api/v2/" // this is the same as in server.js this is unique identifier
    // scope="read:current_user update:current_user_metadata"
    scope="read:users read:current_user read:user_idp_tokens"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
