import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//import { Navbar, Nav } from 'react-bootstrap'; // Import Navbar and Nav components from react-bootstrap

const Header = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Link to={"create-conference"} className="nav-link">Create Conference</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to={"select-conference"} className="nav-link">Select Conference</Link>
    </Nav.Item>
    <Nav.Item>
      <Link  to={"paper-review"} className="nav-link"> Allot Paper</Link>
    </Nav.Item>
    {/* <Nav.Item>
      <Link  to={"member-info"} className="nav-link"> TPC Members </Link>
    </Nav.Item> */}
    {/* <Nav.Item>
      <Link  to={"reviewer-info"} className="nav-link"> List Of Reviewers </Link>
    </Nav.Item> */}
    <Nav.Item>
      <Link  to={"email-formation"} className="nav-link"> Reviewer Invitation </Link>
    </Nav.Item>
    <Nav.Item>
      <Link  to={"review-paper"} className="nav-link"> Review Format </Link>
    </Nav.Item>
    <Nav.Item>
      <Link  to={"reports"} className="nav-link"> Reports </Link>
    </Nav.Item>
    {/* <Nav.Item>
      <Link to="/committee-members-registration" className="nav-link"> Committee Members</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/reviewers-registration" className="nav-link"> Reviewers</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/paper-review" className="nav-link">Paper Allotments</Link>
    </Nav.Item> */}
  </Nav>
  );
};

export default Header;
