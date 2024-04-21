import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
function Reports_root() {
  const data = useLoaderData();
  const conference = data.data || [];
  const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const linkStyle = {
        textDecoration: 'none' // Remove underline
      }
      const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (selectedConferenceId) {
          // setConferenceToSession(selectedConferenceId).then((response) => {
          //   console.log(response);
          // }).catch((err) => {
          //   console.log(err);
          // });
          sessionStorage.setItem('con', selectedConferenceId);
          alert("conference set successfully done");
    
    
        } else {
          console.log("Please select a conference");
        }
      };
  return (
   
    <Container>
      <Row>
        <Col md={6} className="mt-4"> {/* Adjust offset and margin top for spacing */}
          <ListGroup>
          <Form onSubmit={handleFormSubmit}>
      <Row>
        <Col xs={8}>
          <Form.Select aria-label="Select conference" value={selectedConferenceId} onChange={(e) => setSelectedConferenceId(e.target.value)}>
            <option value="">Select conference</option>
            {conference.map((conferenceItem) => (
              <option key={conferenceItem._id} value={conferenceItem._id}>
                {conferenceItem.conference_title}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={4}>
          <Button type="submit" variant="primary">Select</Button>
        </Col>
      </Row>
    </Form> <br /><br />
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