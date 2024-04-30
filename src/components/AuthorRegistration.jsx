
import React, { useEffect, useState } from 'react';
import { createAuthorWork } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const AuthorRegistration = () => {
  const data = useLoaderData();
  const conferenceList = data.data;
  //console.log(conferenceList);
  const [conference, setConference] = useState('');
  const [tracks, setTracks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [country, setCountry] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [googlescId, setGooglescId] = useState('');
  const [orchidId, setOrchidId] = useState('');
  const [title, setTitle] = useState('');
  const [track, setTrack] = useState('');
  const [keywords, setKeywords] = useState('');
  const [abstract, setAbstract] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [completionMessage, setCompletionMessage] = useState('');
  const [topicid, setTopicid] = useState('');
  const [CoAuthors, setCoAuthors] = useState([]);
  const [selectedTrackId,setSelectedTrackId]=useState('');
  const [errors, setErrors] = useState({
    name: '',
    affiliation: '',
    country: '',
    contactNumber: '',
    email: '',
    title: '',
    track: '',
    topicid: '',
    keywords: '',
    abstract: '',
    pdfFile: '',
  });

  // useEffect(() => {
  //   setTracks(conference.tracks);
  // }, []);

  const handleTrackChange = (e) => {
    const ind = e.target.selectedIndex - 1;
    setSelectedTrackId(e.target.value);
    if (ind !== -1) {
      setTopics(tracks[ind].topics);
      setTrack(tracks[ind].track_name);
    } else {
      setTopics([]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
   
    if (!name) newErrors.name = 'Name is required.';
    if (!affiliation) newErrors.affiliation = 'Affiliation is required.';
    if (!country) newErrors.country = 'Country is required.';
    if (!contactNumber) newErrors.contactNumber = 'Contact number is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!title) newErrors.title = 'Title is required.';
    if (!track) newErrors.track = 'Track is required.';
    if (!topicid) newErrors.topicid = 'Topic is required.';
    if (!keywords) newErrors.keywords = 'Keywords are required.';
    if (!abstract) newErrors.abstract = 'Abstract is required.';
    if (!pdfFile) newErrors.pdfFile = 'PDF file is required.';
    setErrors(newErrors);
   
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const coAuthorsData = CoAuthors.map(coAuthor => ({
      name: coAuthor.name,
      affiliation: coAuthor.affiliation,
      country: coAuthor.country,
      contact_no: coAuthor.mobile, // Assuming mobile field is used for contact number
      email: coAuthor.email
    }));
    //console.log("ff");
    const authorWorkData = {
      name,
      affiliation,
      country,
      contact_no: contactNumber,
      email,
      google_sh_id: googlescId,
      orcid_id: orchidId,
      title,
      keywords,
      abstract,
     // pdf: pdfFile, // Assuming pdfFile contains the file data
      co_authors: coAuthorsData
    };
    //const authorwork = { name, affiliation, country, contactNumber, email,googlescId,orchidId, title, keywords, abstract, pdfFile };
    console.log(pdfFile);
    
    //console.log(CoAuthors[0]);
    createAuthorWork(authorWorkData, topicid, selectedTrackId, conference._id,pdfFile)
      .then((Response) => {
        alert(Response.data.message);
        // setCompletionMessage('Registration completed successfully!');
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data.error);
        console.log(err);
      });
  };

  const handleAddCoAuthor = () => {
    const newCoAuthor = { name: '', email: '', mobile: '', affiliation: '', country: '', googleScholarId: '', orchidId: '' };
    setCoAuthors([...CoAuthors, newCoAuthor]);
  };

  const handleCoAuthorChange = (index, field, value) => {
    const updatedCoAuthors = [...CoAuthors];
    updatedCoAuthors[index][field] = value;
    setCoAuthors(updatedCoAuthors);
  };

  const handleDeleteCoAuthor = (index) => {
    const updatedCoAuthors = [...CoAuthors];
    updatedCoAuthors.splice(index, 1);
    setCoAuthors(updatedCoAuthors);
  };

  const handleConferenceChange = (event) => {
    const selectedConferenceId = event.target.value;
    //console.log(selectedConferenceId);
    const selectedConferenceData = conferenceList.find(
      (conference) => conference._id == selectedConferenceId
    );
    //console.log(selectedConferenceData);
    setConference(selectedConferenceData);
   
    setTracks(selectedConferenceData.tracks);
    console.log(selectedConferenceData.tracks)
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-15">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Submit Paper</h3>
              {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
              <form onSubmit={handleFormSubmit}>
                {/* Your form fields */}
                {/* Name */}
                <div className="mb-3">
                <label className="form-label">Conference:</label>
                <select
                    className={`form-select mb-3 ${errors.track ? 'is-invalid' : ''}`}
                    onChange={handleConferenceChange}
                >
                    <option value="">Select Conference</option>
                    {/* {tracks.map((con, index) => (
                        <option key={index} value={con.track_id}>{con.track_name}</option>
                    ))} */}
                     {conferenceList.map((conferenceItem) => (
              <option key={conferenceItem._id} value={conferenceItem._id}>
                {conferenceItem.conference_title}
              </option>
            ))}
                </select>
                <div className="invalid-feedback">{errors.track}</div>
            </div>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                {/* Affiliation */}
                <div className="mb-3">
                  <label className="form-label">Affiliation:</label>
                  <textarea
                    className={`form-control ${errors.affiliation ? 'is-invalid' : ''}`}
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                  ></textarea>
                  <div className="invalid-feedback">{errors.affiliation}</div>
                </div>
                {/* Country */}
                <div className="mb-3">
                  <label className="form-label">Country:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <div className="invalid-feedback">{errors.country}</div>
                </div>
                {/* Contact Number */}
                <div className="mb-3">
                  <label className="form-label">Contact Number:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                  <div className="invalid-feedback">{errors.contactNumber}</div>
                </div>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                {/* Google Scholar ID */}
                <div className="mb-3">
                <label className="form-label">Google Scholar ID (Optional):</label>
                <input
                    type="text"
                    className={`form-control mb-3`}
                    value={googlescId}
                    onChange={(e) => setGooglescId(e.target.value)}
                />
            </div>
            {/* ORCID ID */}
            <div className="mb-3">
                <label className="form-label">ORCID ID (Optional):</label>
                <input
                    type="text"
                    className={`form-control mb-3`}
                    value={orchidId}
                    onChange={(e) => setOrchidId(e.target.value)}
                />
            </div>
            {/* Co-authors */}
            <label className="form-label">Co-authors:</label>
            <div>
                <b><p onClick={handleAddCoAuthor} style={{ cursor: 'pointer' }}>Add Co-Author</p></b>
                {CoAuthors.map((coAuthor, index) => (
                    <div key={index} className="row mb-3">
                        <div className="col">
                            <input
                                type="text"
                                placeholder="Name"
                                value={coAuthor.name}
                                onChange={(e) => handleCoAuthorChange(index, 'name', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="email"
                                placeholder="Email"
                                value={coAuthor.email}
                                onChange={(e) => handleCoAuthorChange(index, 'email', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                placeholder="Mobile"
                                value={coAuthor.mobile}
                                onChange={(e) => handleCoAuthorChange(index, 'mobile', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                placeholder="Affiliation"
                                value={coAuthor.affiliation}
                                onChange={(e) => handleCoAuthorChange(index, 'affiliation', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                placeholder="Country"
                                value={coAuthor.country}
                                onChange={(e) => handleCoAuthorChange(index, 'country', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                placeholder="Google Scholar ID (Optional)"
                                value={coAuthor.googleScholarId}
                                onChange={(e) => handleCoAuthorChange(index, 'googleScholarId', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                placeholder="ORCID ID (Optional)"
                                value={coAuthor.orchidId}
                                onChange={(e) => handleCoAuthorChange(index, 'orchidId', e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="col-auto">
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDeleteCoAuthor(index)}
                            >
                                &#10060;
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Track */}
            <div className="mb-3">
                <label className="form-label">Track:</label>
                <select
                    className={`form-select mb-3 ${errors.track ? 'is-invalid' : ''}`}
                    onChange={handleTrackChange}
                >
                    <option value="">Select Track</option>
                    {tracks.map((con, index) => (
                        <option key={index} value={con._id}>{con.track_name}</option>
                    ))}
                </select>
                <div className="invalid-feedback">{errors.track}</div>
            </div>
            {/* Topic */}
            <div className="mb-3">
                <label className="form-label">Topic:</label>
                <select
                    className={`form-select mb-3 ${errors.topicid ? 'is-invalid' : ''}`}
                    value={topicid}
                    onChange={(e) => setTopicid(e.target.value)}
                >
                    <option value="">Select Topic</option>
                    {topics.map(con => (
                        <option key={con._id} value={con._id}>{con.topic_name}</option>
                    ))}
                </select>
                <div className="invalid-feedback">{errors.topicid}</div>
            </div>
            {/* Remaining fields */}
            {/* Title, Keywords, Abstract, PDF upload */}
            {/* Submission button */}
            <div className="mb-3">
    {/* Title */}
    <label className="form-label">Title:</label>
    <input
        type="text"
        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />
    <div className="invalid-feedback">{errors.title}</div>
</div>
            <div className="mb-3">
    {/* Keywords */}
    <label className="form-label">Keywords:</label>
    <textarea
        className={`form-control ${errors.keywords ? 'is-invalid' : ''}`}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
    ></textarea>
    <div className="invalid-feedback">{errors.keywords}</div>
    <p style={{ float: 'right', color: 'red' }}>(Limited to five keywords)</p>
</div>

<div className="mb-3">
    {/* Abstract */}
    <label className="form-label">Abstract:</label>
    <textarea
        className={`form-control ${errors.abstract ? 'is-invalid' : ''}`}
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
    ></textarea>
    <div className="invalid-feedback">{errors.abstract}</div>
    <p style={{ float: 'right', color: 'red' }}>(Limited to 200 words)</p>
</div>

<div className="mb-3">
    {/* PDF Upload */}
    <label className="form-label">Upload PDF:</label>
    <input
        type="file"
        className={`form-control ${errors.pdfFile ? 'is-invalid' : ''}`}
        accept=".pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
    />
    <div className="invalid-feedback">{errors.pdfFile}</div>
</div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
                Register
            </button>
            </form>
            </div>
            </div>
            </div>
            </div>
            </div>
            );
            };
            
            export default AuthorRegistration;
            