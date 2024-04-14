import React,{useEffect,useState} from 'react'
import { useLoaderData } from 'react-router-dom';
import { getalltracks,createTopics } from '../Services/ConferenceServices';
function TopicCreation() {
    const data=useLoaderData();
    const conference=data.data;
    const [topics, setTopics] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [trackId, setTrackId] = useState('');
    const [topicInput, setTopicInput] = useState('');
    const [completionMessage, setCompletionMessage] = useState('');
    const [errors, setErrors] = useState({
      topics: '',
      tracks:''
    });
    useEffect(() => {
      fetchTracks();
    }, [conference]);
    const fetchTracks=()=>{
      getalltracks(conference.conference_id).then((Response)=>{
       setTracks(Response.data);
       console.log(Response.data);
      }).catch((err)=>{
        console.log(err)
      })
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      
      const newErrors = {};
    if (topics.length === 0) newErrors.topics = 'At least one topic is required.';
    if(!trackId) newErrors.tracks='track is required.';
     setErrors(newErrors);
     if (Object.keys(newErrors).length > 0) {
      return;
    }
     console.log("asds");
    createTopics(trackId,topics).then((Response)=>{
      console.log(Response.data);
      setCompletionMessage(Response.data);
      setTopics([]);
      setTracks([]);
      setTimeout(()=>{
        // navigate(-1);
        setCompletionMessage('');
  
      },2000);
      
    }).catch((err)=>{
      console.log(err);
    })
     
    }

    const handleAddTrack = () => {
        if (topicInput.trim() !== '') {
          setTopics([...topics, topicInput]);
          setTopicInput('');
        }
      };
      const handleRemoveTrack = (index) => {
        const updatedTracks = [...topics];
        updatedTracks.splice(index, 1);
        setTopics(updatedTracks);
      };
    const handleTrackChange=(e)=>{
      const track=tracks.find(con=>con.track_name===e.target.value);
      if(track){
        setTrackId(track.track_id);
      }
    }
  return (
    <div>
        
       
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
      <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conferences_title} </span>
</p>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Topics</h3>
            {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Track Name:</label>
                <select
                     className={"form-select mb-3"}
                     value={tracks}
                     onChange={handleTrackChange}
                    
                  >
                    <option>Select Track</option>
                    
                  {
                    tracks.map(con=>
                      <option key={con.track_id} value={con.track_name}>{con.track_name}</option>
                       )
                  }
                  </select>
                  {errors.tracks && <div className="invalid-feedback d-block">{errors.tracks}</div>}
              </div>
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
                <label className="form-label">Topic:</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type topic name"
                   value={topicInput}
                     onChange={(e) => setTopicInput(e.target.value)}
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
                  {topics.map((topic, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {topic}
                      <span
                   
                   style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveTrack(index)}
                      >
                        &#10060;
                      </span>
                    </li>
                  ))}
                </ul>
                {errors.topics && <div className="invalid-feedback d-block">{errors.topics}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3" >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default TopicCreation