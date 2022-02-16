import React from "react";

import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  return (
    <div>
      <h1>Welcome to my home page!</h1>
      {isAuthenticated ? (
        <>
          <h3 style={{ margin: "3%" }}>Hello {user.nickname}</h3>
          <Button
            variant="danger"
            type="submit"
            onClick={logout}
            style={{ marginTop: "3%" }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          type="submit"
          onClick={loginWithRedirect}
          style={{ marginTop: "3%" }}
        >
          Login
        </Button>
      )}
    </div>
  );
};
