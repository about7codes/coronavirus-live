import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./virus.png";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand
        className="logo"
        // href={() => window.location.reload()}
        onClick={() => window.location.reload()}
      >
        <img
          src={logo}
          width="30"
          height="30"
          className="align-top"
          alt="logo"
        />
        Coronavirus Live Updates
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
            target="_blank"
          >
            Learn more
          </Nav.Link>
          <Nav.Link
            href="https://www.youtube.com/watch?v=1APwq1df6Mw"
            target="_blank"
          >
            Watch video
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="https://sanaullah.netlify.com/" target="_blank">
            My Portfolio
          </Nav.Link>
          <Nav.Link
            eventKey={2}
            href="https://github.com/about7codes/coronavirus-live"
            target="_blank"
          >
            Github
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
