import React,{useState,useEffect} from 'react';
import { useLoaderData } from 'react-router-dom';
import { emailsend } from '../Services/ConferenceServices';


const EmailFormation = () => {
  const data = useLoaderData();
  const conference = data.data;
  const [tracks, setTracks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicid, setTopicid] = useState('');
  const [track, setTrack] = useState('');
  const [date,setDate]=useState('');
  const [name,setName]=useState('');
  const [designation,setDesignation]=useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    setTracks(conference.tracks);
    setDate(conference.last_date_review_sub);
  }, []);
  const handleTrackChange = (e) => {
    const ind = e.target.selectedIndex - 1;
    if (ind !== -1) {
      setTopics(tracks[ind].topics);
      setTrack(tracks[ind].track_name);
    } else {
      setTopics([]);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailsend(topicid, date, name, designation)
      .then((response) => {
        console.log(response);
        setSuccessMessage('Email sent successfully!');
      })
      .catch((err) => {
        console.log(err);
        setSuccessMessage('Failed to send email. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          Review Details
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="trackSelect" className="form-label">
                Track:
              </label>
              <select
                    className={`form-select mb-3`}
                    onChange={handleTrackChange}
                >
                    <option value="">Select Track</option>
                    {tracks?.map((con, index) => (
                        <option key={index} value={con.track_id}>{con.track_name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
              <label htmlFor="topicSelect" className="form-label">
                Topic:
              </label>
              <select
                    className={`form-select mb-3`}
                    value={topicid}
                    onChange={(e) => setTopicid(e.target.value)}
                >
                    <option value="">Select Topic</option>
                    {topics.map(con => (
                        <option key={con._id} value={con._id}>{con.topic_name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date for Review:
              </label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                value={date}
              />
            </div>
            {/* The paragraph text remains unchanged */}
            <p>
            Thank you for your willingness to serve as a reviewer. Peer review is one of the most important activities of our Society, and your help is appreciated. Written comments are usually the most helpful part of a review. Please provide comments on the second page or on separate sheets. The grading section below is intended to help identify key points for written comments, and also to allow comparisons among different reviewers. A good paper should have a high overall score, but does not have to score well in all aspects to be acceptable. For example, a concise, critical review paper is a valuable publication, although it might have little intrinsic originality. A paper that introduces important new concepts might be valuable even with limited experimental work.
            </p>
            <p>Regards</p>
            {/* Reviewer Name and Designation input fields remain unchanged */}
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="reviewerName" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reviewerName"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="reviewerDesignation" className="form-label">
                    Designation:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reviewerDesignation"
                    placeholder="Enter Your Designation"
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
              </div>
            </div>
             {/* Success message */}
             {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            {/* Loading indicator */}
            {loading && <p>Loading...</p>}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailFormation;
