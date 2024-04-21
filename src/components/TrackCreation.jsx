import React,{useEffect,useState} from 'react'
import { createTracks, getConferencefromsession, listConferenceBtwDate,getConferenceById } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const TrackCreation = () => {
  const data=useLoaderData();
  const conference=data.data;
 
  const navigate = useNavigate();
  const [conferenceId, setConferenceId] = useState('');
  const[existTrack,setExistTrack]=useState([]);

  useEffect(() => {
    
       setExistTrack(conference.tracks);
    
  }, []);
  //const [conference,setConference]=useState('');
  // useEffect(()=>{
  //   fetchData();
  //  },[]);
  // const fetchData=()=>{
  //   const conferenceId = sessionStorage.getItem('con');
  //   getConferenceById(conferenceId).then((Response)=>{
  //    console.log(Response.data);
  //   //  console.log(typeof Response.data);
  //     setConference(Response.data);
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // }



  // useEffect(() => {
  //   if (!conference || Object.keys(conference).length === 0) {
  //     // If conference data is empty, show popup or navigate back
  //     alert('Conference data is empty. Please go back and select a conference.');
  //     navigate("/"); // Navigate back to previous page
  //   }
  // }, [conference, navigate]);










    const [conferenceName, setConferenceName] = useState('');
  const [subject, setSubject] = useState('');
  const [tracks, setTracks] = useState([]);
  const [trackInput, setTrackInput] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [errors, setErrors] = useState({
    conferenceName: '',
    subject: ''
  });

  const handleAddTrack = () => {
    if (trackInput.trim() !== '') {
      setTracks([...tracks, trackInput]);
      setTrackInput('');
    }
  };

  const handleRemoveTrack = (index) => {
    const updatedTracks = [...tracks];
    updatedTracks.splice(index, 1);
    setTracks(updatedTracks);
  };

  const handleFormSubmit = (e) => {
    console.log("fff");
    e.preventDefault();

    const newErrors = {};
    if (tracks.length === 0) newErrors.tracks = 'At least one track is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    //console.log(tracks);
    // Form submission logic here
    //const tracksdata={conferenceId,tracks};
    const newArray = tracks.map((item, index) => ({ track_name: item}));
    const object = { tracks: newArray.map(item => ({ track_name: item.track_name })) };
    console.log(object);
    createTracks(conference._id,object).then((Response)=>{
      console.log(Response.data);
       //setCompletionMessage(Response.data);
       alert(Response.data.message);
       window.location.reload();
    // setSubject('');
    // setTracks([]);
    // setTrackInput('');
    // setTimeout(()=>{
    //   // navigate(-1);
    //   setCompletionMessage('');

    // },2000);
    }).catch((err)=>{
      console.log(err);
    })
    // console.log({
    //   conferenceName,
    //   subject,
    //   tracks,
    //   conferenceId
    // });

    // Reset form fields after submission
   
  };
  const handleConferenceChange = (e) => {
    const selectedConference = conference.find(conf => conf.conferences_title === e.target.value);
    if (selectedConference) {
      setSubject(selectedConference.subject);
      setConferenceId(selectedConference.conference_id);
    }
    setConferenceName(e.target.value);
  };
  return (
    <div>
        
       
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
      <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conference_title}</span>
</p>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Tracks</h3>
            {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
            <form onSubmit={handleFormSubmit}>
              {/* <div className="mb-3">
                <label className="form-label">Conference Name:</label>
                <select
                    className={`form-select mb-3 ${errors.conferenceName ? 'is-invalid' : ''}`}
                    value={conferenceName}
                    onChange={handleConferenceChange}
                    
                  >
                    <option value="">Select Conference</option>
                    
                  {
                    conference.map(con=>
                        <option value={con.conferences_title}>{con.conferences_title}</option>
                       )
                  }
                  </select>
                <div className="invalid-feedback">{errors.conferenceName}</div>
              </div> */}
              {/* <div className="mb-3">
                <label className="form-label">Subject:</label>
                <input
                  type="text"
                  className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled
                />
                <div className="invalid-feedback">{errors.subject}</div>
              </div> */}
              <div className="mb-3">
                <label className="form-label">Tracks:</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type track name"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddTrack}
                  >
                    Add
                  </button>
                </div>
                <ul className="list-group">
                  {tracks.map((track, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {track}
                      <span
                   
                   style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveTrack(index)}
                      >
                        &#10060;
                      </span>
                    </li>
                  ))}
                </ul>
                {errors.tracks && <div className="invalid-feedback d-block">{errors.tracks}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3" >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tracks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {existTrack.map((track, index) => (
                                <tr key={index}>
                                    <td>{track.track_name}</td>
                                </tr>
                            ))}
                            {/* <tr>
                              <td>test</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
    </div>
  </div>
  </div>
  )
}

export default TrackCreation