import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar>
          <Link to={"/"}> Student Portal</Link>
        </Navbar>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", marginLeft: "20px" }}
            navbarScroll
          >
            <Nav>
              <Link to="/addstudent">Add Student</Link>
            </Nav>
            <Nav style={{ textDecoration: "none", marginLeft: "20px" }}>
              <Link to="/students">List Student</Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
