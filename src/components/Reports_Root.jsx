import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
function Reports_root() {
  const data = useLoaderData();
  const conference = data.data || [];
  //console.log(conference);
  const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const linkStyle = {
        textDecoration: 'none' // Remove underline
      }
      const handleConferenceSelect = (e) => {
        console.log(e.target.value);
        sessionStorage.setItem('con', e.target.value);
          alert("conference set successfully done");

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
  return (
   
    <Container>
      <Row>
        <Col md={6} className="mt-4"> {/* Adjust offset and margin top for spacing */}
          <ListGroup>
          <Form onSubmit={handleFormSubmit}>
      <Row>
        <Col xs={8}>
          <Form.Select aria-label="Select conference" value={selectedConferenceId} onChange={handleConferenceSelect}>
            <option value="">Select conference</option>
            {conference.map((conferenceItem) => (
              <option key={conferenceItem._id} value={conferenceItem._id}>
                {conferenceItem.conference_title}
              </option>
            ))}
          </Form.Select>
        </Col>
        {/* <Col xs={4}>
          <Button type="submit" variant="primary">Select</Button>
        </Col> */}
      </Row>
    </Form> <br /><br />
            <Link  to={"/paper-report"} style={linkStyle}><ListGroup.Item>List of papers</ListGroup.Item></Link><br/>
            <Link  to={"/author-report"} style={linkStyle}><ListGroup.Item>Authors wise list of papers</ListGroup.Item></Link><br/>
            <Link  to={"/member-info"} style={linkStyle}><ListGroup.Item>TPC Members</ListGroup.Item></Link><br/>
            <Link  to={"/reviewer-info"} style={linkStyle}><ListGroup.Item>List Of Reviewers</ListGroup.Item></Link><br/>
          {/* //---------------------------------------- */}
          <Link  to={"/first-authorlist-report"} style={linkStyle}><ListGroup.Item>List Of First Authors</ListGroup.Item></Link><br/>
          <Link  to={"/all-authorlist-report"} style={linkStyle}><ListGroup.Item>List of All Authors</ListGroup.Item></Link><br/>
          <Link  to={"/paper-status-report"} style={linkStyle}><ListGroup.Item>List of Papers with Status and Last date of Upload</ListGroup.Item></Link><br/>
         
          <Link  to={"/paper-reviewers-report"} style={linkStyle}><ListGroup.Item>List of Papers with Reviewers</ListGroup.Item></Link><br/>
          <Link  to={"/paper-allot-reviewers-report"} style={linkStyle}><ListGroup.Item>List of Papers allotted to the Reviewers</ListGroup.Item></Link><br/>
          <Link  to={"/paper-sent-copy-right-report"} style={linkStyle}><ListGroup.Item>List of Papers Sent for Copy right</ListGroup.Item></Link><br/>
          <Link  to={"/committee-member-list-report"} style={linkStyle}><ListGroup.Item>List Of Committee Members</ListGroup.Item></Link><br/>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Reports_root