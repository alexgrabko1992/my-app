import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">Itransition</Navbar.Brand>
        <Nav className="me-auto">
          {isAuthenticated ? (
            <>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
