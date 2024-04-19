import React, { useEffect, useState } from 'react';
import { createTracks, listConferenceBtwDate,gellAllAuthors,gellAllReviewers,getalltracks,getallreviewersbytrack,createPaperallot } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const PaperAllotments = () => {
  //fetch conference data
  const data = useLoaderData();
  const conference = data.data;
 //console.log(conference);
 const [authors, setAuthors] = useState([]);
 const [revieres, setRevieres] = useState([]);
 const [tracks,setTracks]=useState([]);
 const[topics,setTopics]=useState([]);
 const [reviewer, setReviewer] = useState('');
 const [informations, setInformations] = useState([]);
 const [informationsfordb, setInformationsfordb] = useState([]);
 const [completionMessage, setCompletionMessage] = useState('');
 const [errorMessage,setErrorMessage]=useState('');
 const [authorWork,setauthorWork]=useState({});
const [title,setTitle]=useState('');
 const [errors, setErrors] = useState({
   paper: '',
   reviewer: ''
 });

useEffect(() => {
  // Assuming 'conference' is defined somewhere
  if (conference) {
      // Update tracks state
      setTracks(conference.tracks);
  }
}, [conference]); // Dependency array ensures the effect runs whenever 'conference' changes

useEffect(() => {
  const extractedTopics = tracks.flatMap(track => track.topics);
  setTopics(extractedTopics);
}, [tracks]); // Dependency array ensures the effect runs whenever 'tracks' changes

const handleTopicChange=(e)=>{
  setAuthors(topics[e.target.selectedIndex-1].author_works);
 // console.log(topics[e.target.selectedIndex-1].authors);
}

const handleauthordata=(member,titlename)=>{
  //console.log(member);
  setTitle(titlename);
  setauthorWork(member);
}

const fetchreviewers=(e)=>{
   
  //console.log(e.target.value);
  if(e.target.selectedIndex){
    setRevieres(tracks[e.target.selectedIndex-1].reviewers)

  }else{
    setRevieres([]);
  }
   
}

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(reviewer);
    const [reviewerId, name] = reviewer.split(',');
     
      // console.log(revieres[reviewer-1].reviewer_id);
    // e.preventDefault();
    //-------------for back
     let authors_work=authorWork._id;
     let reviewer2=reviewerId;
     //-------------for front
     const fat=authorWork.title;
     const frn=name;

    const newErrors = {};
    if (!authors_work) newErrors.paper = 'Paper is required.';
      if (!reviewer2) newErrors.reviewer = 'reviewer is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('fillup form')
      setTimeout(()=>{
        setErrorMessage('');
      },3000)
      return;
    }
     //console.log(informations.findIndex(iteam=>iteam.fat===fat && iteam.frn===frn));
    if(informations.length>0 && informations.findIndex(iteam=>iteam.fat===fat && iteam.frn===frn)!=-1){
      setErrorMessage("Repeated elements");
  
        setTimeout(()=>{
          setErrorMessage('');
        },3000)
      
      return;
    }
    const db={authors_work,reviewer2};
    informationsfordb.push(db);
    //console.log(informationsfordb);

    const front={fat,frn};
    informations.push(front);
    //console.log(informations);
  

  };
  
const removeinfo=(index)=>{
  const updatedinformations = [...informations];
  // Remove the member at the specified index
  updatedinformations.splice(index, 1);
  // Update the state with the updated array
  setInformations(updatedinformations);
}

const submitpaperallotment=()=>{
 

const outputData = informationsfordb.map(item => ({
  "reviewer_id": item.reviewer2,
  "authorwork_id": item.authors_work
}));
console.log(outputData);
if(outputData){
  createPaperallot(outputData).then((response)=>{
    alert(response.data.message);
    setInformationsfordb([]);
    setInformations([]);
    setAuthors([]);
    // setCompletionMessage(response.data);
    //   setTimeout(()=>{
    //     setCompletionMessage('');
    //   },3000)
    
  }).catch((err)=>{
    // setErrorMessage(err);
    // setTimeout(()=>{
    //   setErrorMessage('');
    // },3000)
  })
}

}
  return (
    <div className="container mt-5">
     <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conference_title}</span>
</p>
      <div className="row">
        {/* Left side - Paper Allotment Form */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Allotment Of Papers</h3>
              
              <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Track:</label>
                <select
                     className={"form-select mb-3"}
                    
                     onChange={fetchreviewers}
                    
                  >
                    <option value="">Select Track</option>
                    
                  {
    tracks.map((con, index) => (
        <option key={index} value={con._id}>{con.track_name}</option>
    ))
}
                  </select>
                {/* <div className="invalid-feedback">{errors.conferenceName}</div> */}
              </div>
                <div className="mb-3">
                  <label className="form-label">Reviewers:</label>
                  <select
                    className="form-select mb-3"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}

                   
                  >
                    <option value="">Select Reviewers</option>
                    {
                  revieres.map((member,index)=>(
                    <option key={index} value={`${member._id},${member.name}`}>{member.name}</option>

                  ))
                }
                    {/* Map over reviewers here */}
                  </select>
                  <div className="invalid-feedback">{errors.conferenceName}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Paper:</label>
                  {/* change to input */}
                  <input type="text" className="form-control mb-3" value={title}  disabled/>
                  {/* <div className="invalid-feedback">{errors.conferenceName}</div> */}
                </div>
               

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Add
                </button>
              </form>
            </div>
          </div>
          
        </div>

        {/* Right side - Table */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
            <div className="table-responsive">
            {(completionMessage && !errorMessage) && (
    <div className="alert alert-success" role="alert">{completionMessage}</div>
)}{(errorMessage && !completionMessage) && (
    <div className="alert alert-danger" role="alert">{errorMessage}</div>
)}
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Reviewer</th>
          <th>Paper</th>
        </tr>
      </thead>
      <tbody>
        {/* Iterate over reviewer-paper pairs */}
        {/* Example */}
        {
          informations.map((member,index)=>(
            <tr key={index}>
          <td>{member.frn}</td>
          <td>{member.fat}</td>
          <td style={{ cursor: 'pointer' }} onClick={()=>removeinfo(index)}>&#10060;</td>
        </tr>
          ))
        }

        {/* <tr>
          <td>Reviewer 1</td>
          <td>Paper 1</td>
        </tr>
        <tr>
          <td>Reviewer 2</td>
          <td>Paper 2</td>
        </tr> */}
        {/* End of Example */}
      </tbody>
    </table>
    {informations.length > 0 && (
  <button className="btn btn-primary" onClick={submitpaperallotment}>Save</button>
)}
  </div>
            </div>
          </div>
        </div>
            {/* New Table - Bottom Left */}
            
    <div className="col-md-6 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Submitted Papers</h5>
          <div className="mb-3">
                <label className="form-label">Topic:</label>
                <select
                     className={"form-select mb-3"}
                    // value={conferenceName}
                     onChange={handleTopicChange}
                    
                  >
                    <option value="">Select Topic</option>
                    
                    {
    topics.map((topic, index) => (
        <option key={index} value={topic.topic_name}>{topic.topic_name}</option>
    ))
}
                  </select>
                {/* <div className="invalid-feedback">{errors.conferenceName}</div> */}
              </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Pdf</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {/* Add rows for the new table */}
                {
                  authors.map((member,index)=>(
                    <tr key={index} onClick={()=>handleauthordata(member,member.title)}>

                      <td>{member.name}</td>
                      <td>{member.title}</td>
                      <td>{member.pdf}</td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>
  );
};

export default PaperAllotments;
