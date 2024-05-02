import React,{useEffect,useState} from 'react'
import { createCommittee } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CommitteeRegistration() {
    const data=useLoaderData();
    const conference=data.data;
    console.log(conference)
    const navigate = useNavigate();
    const [conferenceId, setConferenceId] = useState('');
    const [committee,setCommittee]=useState([]);
    
    useEffect(() => {
      if (!conference || Object.keys(conference).length === 0) {
        // If conference data is empty, show popup or navigate back
        alert('Conference data is empty. Please go back and select a conference.');
        navigate("/"); // Navigate back to previous page
      }else{
         setCommittee(conference.committee);
       
      }
    }, [conference, navigate]);

    const [tracks, setTracks] = useState([]);
    const [trackInput, setTrackInput] = useState('');
    const [completionMessage, setCompletionMessage] = useState('');
    const [errors, setErrors] = useState('');
    
  
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
        e.preventDefault();
        setErrors('');
        if(tracks.length===0){
           setErrors("aaa");
            return;
        }
        const com={
          committees:tracks
        }
        console.log(com);
        createCommittee(conference._id,com).then((r)=>{
          alert(r.data.message);
          window.location.reload();
        }).catch((err)=>{
            console.log(err);
        })

        
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
            <h3 className="card-title text-center mb-4">Committee</h3>
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
                <label className="form-label">Committee:</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type Committee name"
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
                {errors && <div className="invalid-feedback d-block">{errors}</div>}
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
                                <th scope="col">Committee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {committee.map((com, index) => (
                                <tr key={index}>
                                    <td>{com.committee_name}</td>
                                </tr>
                            ))}
                            {/* <tr>
                              <td>ddd</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
    </div>
  </div>
  </div>
  )
}

export default CommitteeRegistration