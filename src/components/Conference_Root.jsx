import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { setConferenceToSession } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Axios } from 'axios';

function Conference_Root() {
  const data = useLoaderData();
  const conference = data.data || []; // Ensure conference is an array, if data is undefined or null
  const [selectedConferenceId, setSelectedConferenceId] = useState('');

  const linkStyle = {
    textDecoration: 'none' // Remove underline
  };

  const handleConferenceSelect = (e) => {
    setSelectedConferenceId(e.target.value);
  };

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
/*
 setConferenceToSession(selectedConferenceId).then((response) => {
          console.log(response);
        }).catch((err) => {
          console.log(err);
        });
*/
  return (
    <Container>
      <Row>
        <Col md={6} className="mt-4">
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
    </Form>
            <br />
            {/* <Link to={"/committee-registration"} style={linkStyle}><ListGroup.Item>Committee</ListGroup.Item></Link><br />
            <Link to={"/committee-members-registration"} style={linkStyle}><ListGroup.Item>Members</ListGroup.Item></Link><br /> */}
            <Link to={"/track-creation"} style={linkStyle}><ListGroup.Item>Track</ListGroup.Item></Link><br />
            <Link to={"/topic-creation"} style={linkStyle}><ListGroup.Item>Topics</ListGroup.Item></Link><br />
            <Link to={"/reviewers-registration"} style={linkStyle}><ListGroup.Item>Reviewers</ListGroup.Item></Link><br />
            <Link to={"/author-registration"} style={linkStyle}><ListGroup.Item>Authors Registration</ListGroup.Item></Link><br />
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Conference_Root;
