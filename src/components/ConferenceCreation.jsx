import React, { useState, useEffect } from 'react';
import { createConference } from '../Services/ConferenceServices';

function ConferenceCreation() {
  const [conferenceDetails, setConferenceDetails] = useState({
    name: '',
    shortname: '',
    website: '',
    venue: '',
    address: '',
    place: '',
    state: '',
    country: '',
    fromDate: '',
    toDate: '',
    callForPaperDate: '',
    lastSubmissionDate: '',
    expectedSubmissions: 'None',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConferenceDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let errors = {};
    if (!conferenceDetails.name) errors.name = 'Conference Title is required';
    if (!conferenceDetails.website) errors.website = 'Website is required';
    if (!conferenceDetails.venue) errors.venue = 'Venue is required';
    if (!conferenceDetails.address) errors.address = 'Address is required';
    if (!conferenceDetails.place) errors.place = 'Place is required';
    if (!conferenceDetails.state) errors.state = 'State is required';
    if (!conferenceDetails.country) errors.country = 'Country is required';
    if (!conferenceDetails.fromDate) errors.fromDate = 'From Date is required';
    if (!conferenceDetails.toDate) errors.toDate = 'To Date is required';
    if (!conferenceDetails.callForPaperDate) errors.callForPaperDate = 'Date of Call for Paper is required';
    if (!conferenceDetails.lastSubmissionDate) errors.lastSubmissionDate = 'Last Date for Submission of Paper is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fieldsEmpty = () => {
    setConferenceDetails({
      name: '',
      shortname: '',
      website: '',
      venue: '',
      address: '',
      place: '',
      state: '',
      country: '',
      fromDate: '',
      toDate: '',
      callForPaperDate: '',
      lastSubmissionDate: '',
      expectedSubmissions: 'None',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      //setSuccess(false);

      const conference={
        conference_title: conferenceDetails.name,
        short_name: conferenceDetails.shortname,
        website: conferenceDetails.website,
        venue: conferenceDetails.venue,
        address: conferenceDetails.address,
        place: conferenceDetails.place,
         state: conferenceDetails.state,
        country: conferenceDetails.country,
    from_date: conferenceDetails.fromDate,
    to_date: conferenceDetails.toDate,
    date_of_call_for_paper:conferenceDetails.callForPaperDate,
    last_date_paper_sub: conferenceDetails.lastSubmissionDate,
    number_of_papers: conferenceDetails.expectedSubmissions
      }
      createConference(conference).then((Response)=>{
        setSuccess(true);
        fieldsEmpty();
        console.log(Response.data);
           window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scroll behavior
        });
      }).catch((err)=>{
        console.log(err);
      }).finally(()=>{
         setLoading(false);
      })
      //  console.log(conference);



      // setTimeout(() => {
      //   console.log('Conference Details:', conferenceDetails);
      //   setLoading(false);
      //   setSuccess(true);
      //   window.scrollTo({
      //     top: 0,
      //     behavior: 'smooth' // Smooth scroll behavior
      //   });
      //  // fieldsEmpty();
      // }, 5000); // Simulating a 5-second loading delay
    }
  };

  return (
    <div className='mt-5'>
      <div className="container border border-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded" style={{ height: 'auto', padding: '30px' }}>
        <h1 className="display-4 text-center"> Create Conference</h1>
        {success && (
          <div className="alert alert-success" role="alert">
            Conference details submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row g-2 m-4">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={conferenceDetails.name}
                />
                <label htmlFor="name">Conference Title<span style={{ color: 'red' }}>*</span></label>
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="shortname"
                  name="shortname"
                  onChange={handleChange}
                  value={conferenceDetails.shortname}
                />
                <label htmlFor="shortname">Short Name</label>
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
                  onChange={handleChange}
                  value={conferenceDetails.website}
                />
                <label htmlFor="website">Website<span style={{ color: 'red' }}>*</span></label>
                {errors.website && <small className="text-danger">{errors.website}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="venue"
                  name="venue"
                  onChange={handleChange}
                  value={conferenceDetails.venue}
                />
                <label htmlFor="venue">Venue<span style={{ color: 'red' }}>*</span></label>
                {errors.venue && <small className="text-danger">{errors.venue}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  value={conferenceDetails.address}
                />
                <label htmlFor="address">Address<span style={{ color: 'red' }}>*</span></label>
                {errors.address && <small className="text-danger">{errors.address}</small>}
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
                  onChange={handleChange}
                  value={conferenceDetails.place}
                />
                <label htmlFor="place">Place<span style={{ color: 'red' }}>*</span></label>
                {errors.place && <small className="text-danger">{errors.place}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  onChange={handleChange}
                  value={conferenceDetails.state}
                />
                <label htmlFor="state">State<span style={{ color: 'red' }}>*</span></label>
                {errors.state && <small className="text-danger">{errors.state}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  onChange={handleChange}
                  value={conferenceDetails.country}
                />
                <label htmlFor="country">Country<span style={{ color: 'red' }}>*</span></label>
                {errors.country && <small className="text-danger">{errors.country}</small>}
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
                  onChange={handleChange}
                  value={conferenceDetails.fromDate}
                />
                <label htmlFor="fromDate">From Date<span style={{ color: 'red' }}>*</span></label>
                {errors.fromDate && <small className="text-danger">{errors.fromDate}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="toDate"
                  name="toDate"
                  onChange={handleChange}
                  value={conferenceDetails.toDate}
                />
                <label htmlFor="toDate">To Date<span style={{ color: 'red' }}>*</span></label>
                {errors.toDate && <small className="text-danger">{errors.toDate}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="callForPaperDate"
                  name="callForPaperDate"
                  onChange={handleChange}
                  value={conferenceDetails.callForPaperDate}
                />
                <label htmlFor="callForPaperDate">Date of Call for Paper<span style={{ color: 'red' }}>*</span></label>
                {errors.callForPaperDate && <small className="text-danger">{errors.callForPaperDate}</small>}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  id="lastSubmissionDate"
                  name="lastSubmissionDate"
                  onChange={handleChange}
                  value={conferenceDetails.lastSubmissionDate}
                />
                <label htmlFor="lastSubmissionDate">Last Date for Submission of Paper<span style={{ color: 'red' }}>*</span></label>
                {errors.lastSubmissionDate && <small className="text-danger">{errors.lastSubmissionDate}</small>}
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
                  onChange={handleChange}
                  value={conferenceDetails.expectedSubmissions}
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
          <div className="p-1 text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      </div>
     
    </div>
  );
}

export default ConferenceCreation;
