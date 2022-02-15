import React, { useEffect, useState } from "react";
import config from "../config.js";
import { useAuth0 } from "@auth0/auth0-react";
import GetInfo from "./service/GetInfo.js";

export const App = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  GetInfo.getUser(user, getAccessTokenSilently);

  return isAuthenticated ? (
    <>
      <h1>Hello my friend</h1>
      <button onClick={logout}>Log out</button>
      <p>{JSON.stringify(user)}</p>
    </>
  ) : (
    <button onClick={loginWithRedirect}>Log in</button>
  );
};
