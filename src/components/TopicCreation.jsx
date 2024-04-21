import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { createTopics } from '../Services/ConferenceServices';

function TopicCreation() {
  const data = useLoaderData();
  const conference = data.data;
  const [topics, setTopics] = useState([]);
  const [existtopics, setExistTopics] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [trackId, setTrackId] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [errors, setErrors] = useState({
    topics: '',
    tracks: ''
  });

  useEffect(() => {
    setTracks(conference.tracks || []);
  }, [conference]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (topics.length === 0) newErrors.topics = 'At least one topic is required.';
    if (!trackId) newErrors.tracks = 'Track is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    console.log(trackId);
    const newArray = topics.map((item, index) => ({ topic_name: item}));
    const object = { topics: newArray.map(item => ({ topic_name: item.topic_name })) };
    createTopics(trackId, object)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        setTopics([]);
        setTrackId('');
        // setTimeout(() => {
        //   setCompletionMessage('');
        // }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
   };

  const handleAddTrack = () => {
    if (topicInput.trim() !== '') {
      setTopics([...topics, topicInput]);
      setTopicInput('');
    }
  };

  const handleRemoveTrack = (index) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(index, 1);
    setTopics(updatedTopics);
  };

  const handleTrackChange = (e) => {
    const selectedTrackId = e.target.value;
    setTrackId(selectedTrackId);
    const selectedTrack = tracks.find(track => track._id === selectedTrackId);
    if (selectedTrack) {
      setExistTopics(selectedTrack.topics || []);
      //console.log(existtopics);
    } else {
      setExistTopics([]);
    }
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
                      className={`form-select ${errors.tracks && 'is-invalid'}`}
                      value={trackId}
                      onChange={handleTrackChange}
                    >
                      <option value="">Select Track</option>
                      {tracks.map((track) => (
                        <option key={track._id} value={track._id}>{track.track_name}</option>
                      ))}
                    </select>
                    {errors.tracks && <div className="invalid-feedback">{errors.tracks}</div>}
                  </div>
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
                    {errors.topics && <div className="invalid-feedback">{errors.topics}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
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
                                <th scope="col">Topics</th>
                            </tr>
                        </thead>
                        <tbody>
                            {existtopics.map((topic, index) => (
                                <tr key={index}>
                                    <td>{topic.topic_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
      </div>
    </div>
  );
}

export default TopicCreation;
