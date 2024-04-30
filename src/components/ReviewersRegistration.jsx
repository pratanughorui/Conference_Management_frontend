import React,{useState,useEffect} from 'react'
import { useLoaderData } from 'react-router-dom';
import { createReviewers,gellAllusersBeforDate,gellAllreviewersBeforDate,getalltracks } from '../Services/ConferenceServices';


const ReviewersRegistration=()=> {
    const data=useLoaderData();
    const conference=data.data;
    const [completionMessage, setCompletionMessage] = useState(''); 
    const [errorMessage,setErrorMessage]=useState('');
    const[newmembers,setNewmembers]=useState([]);
    const[existreviewers,setExistreviewers]=useState([]);
const [name, setName] = useState('');
const [trackid, setTrackid] = useState('');
const [affiliation, setAffiliation] = useState('');
const [country, setCountry] = useState('');
const [password, setPassword] = useState('');
const [mobile, setMobile] = useState('');
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({
  name: '',
  affiliation: '',
  place: '',
  state: '',
  country: '',
  mobile: '',
  email: '',
  password: '',
    trackid:''
});


const [tracks,setTracks]=useState([]);
useEffect(()=>{
  trackFetching();
},[])

const trackFetching=()=>{
 setTracks(conference.tracks);
}
let [count,setCount]=useState(0);
const handleSubmit=(e)=>{
 
    e.preventDefault();
    const newErrors = {};
      if (!name) newErrors.name = 'Name is required.';
      if (!affiliation) newErrors.affiliation = 'affiliation is required.';
      if (!country) newErrors.country = 'country is required.';
      if (!mobile) newErrors.mobile = 'Contact number is required.';
      if (!email) newErrors.email = 'Email is required.';
      if (!password) newErrors.password = 'Password is required.';
      if(!trackid) newErrors.trackid='track is required';
      setErrors(newErrors);
      // If there are any errors, stop form submission
      if (Object.keys(newErrors).length > 0) {
        //console.log("ff");
        return;
      }
      if(count===0){
        setCount(trackid);
        console.log(count);
      }else if(count != trackid){
          setErrorMessage("multiple track not allowed");
          setTimeout(()=>{
            setErrorMessage('');
           },2000)
          return;
      }
      if(newmembers.length>0 && newmembers.findIndex(iteam=>iteam.email===email && iteam.trackid===trackid)!=-1){
        setErrorMessage("repeated");
          setTimeout(()=>{
            setErrorMessage('');
           },2000)
        
        return;
      }
      const Reviewers={name,affiliation,country,password,mobile,email,trackid}
      newmembers.push(Reviewers);
      console.log(newmembers);


}

const[oldmembers,setOldmembers]=useState([]);
const getOldData=()=>{
  // gellAllusersBeforDate().then((Response)=>{
  //     //console.log(Response.data);
  //   setOldmembers(Response.data);
  // }).catch((err)=>{
  //   console.log(err);
  // });
 // console.log(oldmembers.length);
  gellAllreviewersBeforDate().then((Response2)=>{
    setOldmembers(prevData => prevData.concat(Response2.data));
  }).catch((err)=>{
    console.log(err);
  })
 
}


const clearFields=()=>{
    setName('');
    setAffiliation('');
    setCountry('');
    setPassword('');
    setMobile('');
    setEmail('');
    setCount(0);
}
const delnewmwmber=(index)=>{
    const updatedMembers = [...newmembers];
      // Remove the member at the specified index
      updatedMembers.splice(index, 1);
      // Update the state with the updated array
      setNewmembers(updatedMembers);
      if(updatedMembers.length==0){
        // console.log("ddd")
        setCount(0);
      }
  }
  const clearnewmembersTable=()=>{
    setNewmembers([]);
    setCount(0);
  }
  const populateMemberForm = (member) => {
    setName(member.name);
    setAffiliation(member.affiliation);
    setCountry(member.country);
    setPassword(member.password);
    setMobile(member.mobile);
    setEmail(member.email);
    //console.log(member);
};
const finalsave=(e)=>{
  e.preventDefault();
  
  const transformedData = {
    "reviewers": newmembers.map(item => ({
        "name": item.name,
        "affiliation": item.affiliation,
        "country": item.country,
        "password": item.password,
        "mobile": item.mobile,
        "email": item.email
    }))
};
console.log(transformedData);
  createReviewers(transformedData,trackid).then((Response)=>{
    alert(Response.data.message);
    window.location.reload();
    
  }).catch((err)=>{
      console.log(err);
    alert(err.response.data.error);
    // setErrorMessage(err.response.data.message);
    // setTimeout(()=>{
    //   setErrorMessage('');
    //  },2000)
  })
 
}
const clearoldmembersTable=()=>{
  setOldmembers([]);
}
const handleTrackChange=(e)=>{
  const selectedTrackId = e.target.value;
setTrackid(selectedTrackId );
const selectedTrack = tracks.find(track => track._id === selectedTrackId);
if (selectedTrack) {
  setExistreviewers(selectedTrack.reviewers || []);
  //console.log(existtopics);
  //console.log(existreviewers);
} else {
  setExistreviewers([]);
}
}

  return (
    <div className="container mt-5">
            <div className="row">
            <p className="text-start conference-info">
  <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conference_title}</span>
</p>
                <div className="col-md-6">
                 <div className="card">
                  <div className="card-body">
                  <div className="mb-3">
                  <h2>Track</h2>
                <select
                    //  className={"form-select mb-3"}
                     value={trackid}
                     onChange={handleTrackChange}
                    className={`form-control ${errors.trackid ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Track</option>
                    
                  {
                    tracks.map(con=>
                        <option key={con._id} value={con._id}>{con.track_name}</option>
                       )
                  }
                  </select>
                <div className="invalid-feedback">{errors.trackid}</div>
              </div>
                  </div>
                 </div>
                    <div className="card">
                      
                        <div className="card-body">
                            <h2>Add Reviewers</h2>
                            <form onSubmit={handleSubmit}>
                            
                            <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
        {/* --------------------------------- */}
          <div className="mb-3">
            <label htmlFor="affiliation" className="form-label">Affiliation:</label>
            <input type="text" className={`form-control ${errors.affiliation ? 'is-invalid' : ''}`} id="affiliation" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} />
            <div className="invalid-feedback">{errors.affiliation}</div>
          </div>
          
          {/* <div className="mb-3">
            <label htmlFor="place" className="form-label">Place:</label>
            <input type="text" className={`form-control ${errors.place ? 'is-invalid' : ''}`} id="place" value={place} onChange={(e) => setPlace(e.target.value)} />
            <div className="invalid-feedback">{errors.place}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State:</label>
            <input type="text" className={`form-control ${errors.state ? 'is-invalid' : ''}`} id="state" value={state} onChange={(e) => setState(e.target.value)} />
            <div className="invalid-feedback">{errors.state}</div>
          </div> */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country:</label>
            <input type="text" className={`form-control ${errors.country ? 'is-invalid' : ''}`} id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <div className="invalid-feedback">{errors.country}</div>
          </div>
         
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile:</label>
            <input type="text" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <div className="invalid-feedback">{errors.mobile}</div>
          </div>
          
    
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <button type="submit" className="btn btn-primary">Add</button> &nbsp;
          <button type="button" className="btn" style={{backgroundColor: 'teal',color:'white'}} onClick={clearFields}>Next</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>Old Reviewers</h2>
                            {/* <div className="d-flex align-items-center mb-3">
        <label htmlFor="Track" className="me-2">Track</label>
        <select name="Track" id="Track" className="form-select form-select-sm">
        
        </select>
    </div>   */}
                            <table className="table">
                            <thead>
            <tr>
              
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              
            </tr>
          </thead>
          <tbody>
            {oldmembers.map((member, index) => (
              <tr key={index} onClick={() => populateMemberForm(member)}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                
              </tr>
            ))}
          </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={getOldData}>Old Members</button>&nbsp;
          {
            oldmembers.length > 0 && ( <button type="button" className="btn btn-danger" onClick={clearoldmembersTable}>Clear</button> )
          }
         
       
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                        {completionMessage && !errorMessage && (
    <div className="alert alert-success" role="alert">
        {completionMessage}
    </div>
)}

{errorMessage && !completionMessage && (
    <div className="alert alert-danger" role="alert">
        {errorMessage}
    </div>
)}
                            <h2>Reviewers For</h2>
                            <table className="table">
                            <thead>
          <tr>
          <th scope="col">Name</th>
            <th scope="col">Email</th>
            
           
          </tr>
        </thead>
        <tbody>
        {existreviewers.map((reviewer, index) => (
                                <tr key={index}>
                                    <td>{reviewer.name}</td>
                                    <td>{reviewer.email}</td>
                                </tr>
                            ))}
            {newmembers.map((member, index) => (
              <tr key={index} onClick={() => populateMemberForm(member)}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                
                <td style={{ cursor: 'pointer' }} onClick={()=>delnewmwmber(index)}>&#10060;</td>
              </tr>
            ))}
          </tbody>
                            </table>
                            {newmembers.length > 0 && (
          <>
            <button className="btn btn-primary" onClick={finalsave}>Save</button>&nbsp;
            <button type="button" className="btn btn-danger" onClick={clearnewmembersTable}>Clear</button>
          </>
        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ReviewersRegistration
