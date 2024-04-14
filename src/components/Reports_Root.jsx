import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Reports_root() {
    const linkStyle = {
        textDecoration: 'none' // Remove underline
      }
  return (
   
    <Container>
      <Row>
        <Col md={6} className="mt-4"> {/* Adjust offset and margin top for spacing */}
          <ListGroup>
            <Link  to={"/paper-report"} style={linkStyle}><ListGroup.Item>List of papers</ListGroup.Item></Link><br/>
            <Link  to={"/author-report"} style={linkStyle}><ListGroup.Item>Authors wise list of papers</ListGroup.Item></Link><br/>
            <Link  to={"/member-info"} style={linkStyle}><ListGroup.Item>TPC Members</ListGroup.Item></Link><br/>
            <Link  to={"/reviewer-info"} style={linkStyle}><ListGroup.Item>List Of Reviewers</ListGroup.Item></Link><br/>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Reports_root