/*!

=========================================================
=========================================================

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="4">
            <h3 className="title">Pages</h3>
            <Nav>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  App
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Metadata Viewer
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Help Center
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Doodle Fruits
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Collection
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="4">
            <h3 className="title">Legal</h3>
            <Nav>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Terms of Service
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Privacy Policy
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Contact US
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Affiliate Program
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="4">
            <h3 className="title">Social</h3>
            <Nav>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Twitter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Discord
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Youtube
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
