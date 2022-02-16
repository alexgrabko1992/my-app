import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Container from "react-bootstrap/Container";

import { Home } from "./Home";
import { NavBar } from "./NavBar";
import { Users } from "./Users";

export const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <Container>
        <NavBar />
        {isAuthenticated ? (
          <>
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route exact path="/users" element={<Users />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        )}
      </Container>
    </Router>
  );
};
