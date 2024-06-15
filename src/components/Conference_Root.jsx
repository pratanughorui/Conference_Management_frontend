    // import React, { useState } from 'react';
    // //import 'bootstrap/dist/css/bootstrap.min.css';
    // import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
    // import { setConferenceToSession } from '../Services/ConferenceServices';
    // import { useLoaderData } from 'react-router-dom';
    // import { Link } from 'react-router-dom';
    // import { Axios } from 'axios';

    // function Conference_Root() {
    //   const data = useLoaderData();
    //   const conference = data.data || []; // Ensure conference is an array, if data is undefined or null
    //   const [selectedConferenceId, setSelectedConferenceId] = useState('');

    //   const linkStyle = {
    //     textDecoration: 'none' // Remove underline
    //   };

    //   const handleConferenceSelect = (e) => {
    //     console.log(e.target.value);
    //     sessionStorage.setItem('con', e.target.value);
    //       alert("conference set successfully done");

    //   };

    //   const handleFormSubmit = (e) => {
    //     e.preventDefault(); // Prevent default form submission
    //     if (selectedConferenceId) {
    //       // setConferenceToSession(selectedConferenceId).then((response) => {
    //       //   console.log(response);
    //       // }).catch((err) => {
    //       //   console.log(err);
    //       // });
    //       sessionStorage.setItem('con', selectedConferenceId);
    //       alert("conference set successfully done");


    //     } else {
    //       console.log("Please select a conference");
    //     }
    //   };
    // /*
    // setConferenceToSession(selectedConferenceId).then((response) => {
    //           console.log(response);
    //         }).catch((err) => {
    //           console.log(err);
    //         });
    // */
    //   return (
    //     <Container>
    //       <Row>
    //         <Col md={6} className="mt-4">
    //           <ListGroup>
    //           <Form onSubmit={handleFormSubmit}>
    //       <Row>
    //         <Col xs={8}>
    //           <Form.Select aria-label="Select conference" value={selectedConferenceId} onChange={handleConferenceSelect}>
    //             <option value="">Select conference</option>
    //             {conference.map((conferenceItem) => (
    //               <option key={conferenceItem._id} value={conferenceItem._id}>
    //                 {conferenceItem.conference_title}
    //               </option>
    //             ))}
    //           </Form.Select>
    //         </Col>
    //         {/* <Col xs={4}>
    //           <Button type="submit" variant="primary">Select</Button>
    //         </Col> */}
    //       </Row>
    //     </Form>
    //             <br />
    //             <Link to={"/committee-registration"} style={linkStyle}><ListGroup.Item>Committee</ListGroup.Item></Link><br />
    //             <Link to={"/committee-members-registration"} style={linkStyle}><ListGroup.Item>Members</ListGroup.Item></Link><br />
    //             <Link to={"/track-creation"} style={linkStyle}><ListGroup.Item>Track</ListGroup.Item></Link><br />
    //             <Link to={"/topic-creation"} style={linkStyle}><ListGroup.Item>Topics</ListGroup.Item></Link><br />
    //             <Link to={"/reviewers-registration"} style={linkStyle}><ListGroup.Item>Reviewers</ListGroup.Item></Link><br />
    //             <Link to={"/author-registration"} style={linkStyle}><ListGroup.Item>Authors Registration</ListGroup.Item></Link><br />
    //           </ListGroup>
    //         </Col>
    //       </Row>
    //     </Container>
    //   );
    // }

    // export default Conference_Root;
    import { Link } from 'react-router-dom';
    import React, { useState, useEffect } from 'react';
    import { useLoaderData } from 'react-router-dom';
    import { getConferenceByid,getAllConference } from '../Services/ConferenceServices';

import { Spinner } from 'react-bootstrap';
// import { getAllConference } from '../service/ConferenceService';
// import { getConferenceById } from '../service/ConferenceService';

function Conference_Root() {
  // const data = useLoaderData();
  //  const conference = data.data || [];
   const [conference,setConference]=useState([]);
  const [loading, setLoading] = useState(true);
  //const [conference,Setconference]=useState([]);
  const [SelectedConference,Setselectedconference]=useState('');
  const conferenceDetails = {
    name: "Sample Conference",
    email: "sample@conference.com",
    website: "www.sampleconference.com",
    venue: "Sample Venue",
    address: "123 Sample Address",
    place: "Sample Place",
    state: "Sample State",
    country: "Sample Country",
    fromDate: "2024-06-01",
    toDate: "2024-06-05",
    callForPaperDate: "2024-03-01",
    lastSubmissionDate: "2024-04-01",
    expectedSubmissions: "<1000"
  };
  let [conferenceId,setconferenceId]=useState('');

  const handleConferenceChange = (event) => {
    const selectedConferenceId = event.target.value;
    console.log(selectedConferenceId);
        sessionStorage.setItem('con', selectedConferenceId);
          alert("conference set successfully done");
          getSelectedConference();
  };

  const getSelectedConference=()=>{
    const conference_id=sessionStorage.getItem('con');
    if (conference_id) {
      getConferenceByid(conference_id).then((Response)=>{
        Setselectedconference(Response.data);
      }).catch((err)=>{
         console.log(err);
      })
      //throw new Error('Conference ID not found in session storage.');
    } 
   
  };
  

  useEffect(() => {
    getAllConference().then((Response)=>{
      setConference(Response.data);
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
    })
    getSelectedConference();
  }, []);

  useEffect(()=>{


  },[]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className='container text-primary-emphasis mt-5'>
      <div className="row">
      <div className='col-md-4 border p-3'>
  <div className="row g-3 m-2">
    <div className="col-12">
      <div className="form-floating">
        <select
          className="form-select"
          id="expectedSubmissions"
          name="expectedSubmissions"
          onChange={handleConferenceChange}
        >
          <option value="None">Select Conference</option>
          {conference.map((con) => (
            <option key={con._id} value={con._id}>{con.conference_title}</option>
          ))}
        </select>
        <label htmlFor="expectedSubmissions">Select Conference</label>
      </div>
    </div>
  </div>
  
  <div className="row mt-3">
    <div className="col-12 d-flex justify-content-center">
    <Link to={"/committee-registration"} style={{ textDecoration: 'none' }}>

      <div className="card1">
        <div className='card border-primary' style={{ width: '100%', cursor: 'pointer' }}>
          <div className='card-body d-flex justify-content-center align-items-center p-3'>
            <p className='card-text mb-0'>Committee</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>
  
  <div className="row mt-3">
    <div className="col-12 d-flex justify-content-center">
      <Link to={"/committee-members-registration"} style={{ textDecoration: 'none' }}>
        <div className="card2">
          <div className='card border-primary' style={{ width: '100%', cursor: 'pointer' }}>
            <div className='card-body d-flex justify-content-center align-items-center p-3'>
              <p className='card-text mb-0'>Members</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
  
  <div className="row mt-3">
    <div className="col-12 d-flex justify-content-center">
           <Link to={"/track-creation"}style={{ textDecoration: 'none' }}>

      <div className="card1">
        <div className='card border-primary' style={{ width: '100%', cursor: 'pointer' }}>
          <div className='card-body d-flex justify-content-center align-items-center p-3'>
            <p className='card-text mb-0'>Track</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>
  
  <div className="row mt-3">
    <div className="col-12 d-flex justify-content-center">
      <Link to={"/reviewers-registration"} style={{ textDecoration: 'none' }}>
        <div className="card2">
          <div className='card border-primary' style={{ width: '100%', cursor: 'pointer' }}>
            <div className='card-body d-flex justify-content-center align-items-center p-3'>
              <p className='card-text mb-0'>Reviewers</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
  
  <div className="row mt-3">
    <div className="col-12 d-flex justify-content-center">
  <Link to={"/author-registration"} style={{ textDecoration: 'none' }}>

      <div className="card1">
        <div className='card border-primary' style={{ width: '100%', cursor: 'pointer' }}>
          <div className='card-body d-flex justify-content-center align-items-center p-3'>
            <p className='card-text mb-0'>Author Registration</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>
</div>


        <div className='col-md-8 border'>
          <h1 className="display-5 text-center">Selected Conference</h1>
          <div className="border rounded">
            <form>
              <div className="row g-2 m-4">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={SelectedConference.conference_title||''}
                      disabled
                    />
                    <label htmlFor="name">Conference Title<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={SelectedConference.short_name||''}
                      disabled
                    />
                    <label htmlFor="email">Short Name</label>
                  </div>
                </div>
              </div>
              <div className="row g-2 m-4">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="website"
                      name="website"
                      value={SelectedConference.website||''}
                      disabled
                    />
                    <label htmlFor="website">Website<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="venue"
                      name="venue"
                      value={SelectedConference.venue||''}
                      disabled
                    />
                    <label htmlFor="venue">Venue<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={SelectedConference.address||''}
                      disabled
                    />
                    <label htmlFor="address">Address<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
              </div>
              <div className="row g-2 m-4">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="place"
                      name="place"
                      value={SelectedConference.place||''}
                      disabled
                    />
                    <label htmlFor="place">Place<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      value={SelectedConference.state||''}
                      disabled
                    />
                    <label htmlFor="state">State<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={SelectedConference.country||''}
                      disabled
                    />
                    <label htmlFor="country">Country<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
              </div>
              <div className="row g-2 m-4">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="fromDate"
                      name="fromDate"
                      value={SelectedConference.from_date||''}
                      disabled
                    />
                    <label htmlFor="fromDate">From Date<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="toDate"
                      name="toDate"
                      value={SelectedConference.to_date||''}
                      disabled
                    />
                    <label htmlFor="toDate">To Date<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="callForPaperDate"
                      name="callForPaperDate"
                      value={SelectedConference.date_of_call_for_paper||''}
                      disabled
                    />
                    <label htmlFor="callForPaperDate">Date of Call for Paper<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="lastSubmissionDate"
                      name="lastSubmissionDate"
                      value={SelectedConference.last_date_paper_sub||''}
                      disabled
                    />
                    <label htmlFor="lastSubmissionDate">Last Date for Submission of Paper<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
              </div>
              <div className="row g-2 m-4">
                <div className="col-md">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="expectedSubmissions"
                      name="expectedSubmissions"
                      value={SelectedConference.umber_of_papers||''}
                      disabled
                    >
                      <option value="None">None</option>
                      <option value="<100">&lt;100</option>
                      <option value="<500">&lt;500</option>
                      <option value="<1000">&lt;1000</option>
                      <option value="<2000">&lt;2000</option>
                      <option value="<5000">&lt;5000</option>
                      <option value="<10000">&lt;10000</option>
                      <option value="<20000">&lt;20000</option>
                    </select>
                    <label htmlFor="expectedSubmissions">How Many Submissions Do You Expect<span style={{ color: 'red' }}>*</span></label>
                  </div>
                </div>
              </div>
              {/* <div className="p-1">
                <button type="submit" className="btn btn-primary" disabled>Submit</button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conference_Root;

