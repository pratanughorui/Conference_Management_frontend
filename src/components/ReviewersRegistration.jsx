// import React,{useState,useEffect} from 'react'
// import { useLoaderData } from 'react-router-dom';
// import { createReviewers,gellAllusersBeforDate,gellAllreviewersBeforDate,getalltracks } from '../Services/ConferenceServices';


// const ReviewersRegistration=()=> {
//     const data=useLoaderData();
//     const conference=data.data;
//     const [completionMessage, setCompletionMessage] = useState(''); 
//     const [errorMessage,setErrorMessage]=useState('');
//     const[newmembers,setNewmembers]=useState([]);
//     const[existreviewers,setExistreviewers]=useState([]);
// const [name, setName] = useState('');
// const [trackid, setTrackid] = useState('');
// const [affiliation, setAffiliation] = useState('');
// const [country, setCountry] = useState('');
// const [password, setPassword] = useState('');
// const [mobile, setMobile] = useState('');
// const [email, setEmail] = useState('');
// const [errors, setErrors] = useState({
//   name: '',
//   affiliation: '',
//   place: '',
//   state: '',
//   country: '',
//   mobile: '',
//   email: '',
//   password: '',
//     trackid:''
// });


// const [tracks,setTracks]=useState([]);
// useEffect(()=>{
//   trackFetching();
// },[])

// const trackFetching=()=>{
//  setTracks(conference.tracks);
// }
// let [count,setCount]=useState(0);
// const handleSubmit=(e)=>{
 
//     e.preventDefault();
//     const newErrors = {};
//       if (!name) newErrors.name = 'Name is required.';
//       if (!affiliation) newErrors.affiliation = 'affiliation is required.';
//       if (!country) newErrors.country = 'country is required.';
//       if (!mobile) newErrors.mobile = 'Contact number is required.';
//       if (!email) newErrors.email = 'Email is required.';
//       if (!password) newErrors.password = 'Password is required.';
//       if(!trackid) newErrors.trackid='track is required';
//       setErrors(newErrors);
//       // If there are any errors, stop form submission
//       if (Object.keys(newErrors).length > 0) {
//         //console.log("ff");
//         return;
//       }
//       if(count===0){
//         setCount(trackid);
//         //console.log(count);
//       }else if(count != trackid){
//           setErrorMessage("multiple track not allowed");
//           setTimeout(()=>{
//             setErrorMessage('');
//            },2000)
//           return;
//       }
//       if(newmembers.length>0 && newmembers.findIndex(iteam=>iteam.email===email && iteam.trackid===trackid)!=-1){
//         setErrorMessage("repeated");
//           setTimeout(()=>{
//             setErrorMessage('');
//            },2000)
        
//         return;
//       }
//       const Reviewers={name,affiliation,country,password,mobile,email,trackid}
//       newmembers.push(Reviewers);
//       console.log(newmembers);


// }

// const[oldmembers,setOldmembers]=useState([]);
// const getOldData=()=>{
//   // gellAllusersBeforDate().then((Response)=>{
//   //     //console.log(Response.data);
//   //   setOldmembers(Response.data);
//   // }).catch((err)=>{
//   //   console.log(err);
//   // });
//  // console.log(oldmembers.length);
//   gellAllreviewersBeforDate().then((Response2)=>{
//     setOldmembers(prevData => prevData.concat(Response2.data));
//   }).catch((err)=>{
//     console.log(err);
//   })
 
// }


// const clearFields=()=>{
//     setName('');
//     setAffiliation('');
//     setCountry('');
//     setPassword('');
//     setMobile('');
//     setEmail('');
//     setCount(0);
// }
// const delnewmwmber=(index)=>{
//     const updatedMembers = [...newmembers];
//       // Remove the member at the specified index
//       updatedMembers.splice(index, 1);
//       // Update the state with the updated array
//       setNewmembers(updatedMembers);
//       if(updatedMembers.length==0){
//         // console.log("ddd")
//         setCount(0);
//       }
//   }
//   const clearnewmembersTable=()=>{
//     setNewmembers([]);
//     setCount(0);
//   }
//   const populateMemberForm = (member) => {
//     setName(member.name);
//     setAffiliation(member.affiliation);
//     setCountry(member.country);
//     setPassword(member.password);
//     setMobile(member.mobile);
//     setEmail(member.email);
//     //console.log(member);
// };
// const finalsave=(e)=>{
//   e.preventDefault();
  
//   const transformedData = {
//     "reviewers": newmembers.map(item => ({
//         "name": item.name,
//         "affiliation": item.affiliation,
//         "country": item.country,
//         "password": item.password,
//         "mobile": item.mobile,
//         "email": item.email
//     }))
// };
// console.log(transformedData);
//   createReviewers(transformedData,trackid).then((Response)=>{
//     alert(Response.data.message);
//     window.location.reload();
    
//   }).catch((err)=>{
//       console.log(err);
//     alert(err.response.data.error);
//     // setErrorMessage(err.response.data.message);
//     // setTimeout(()=>{
//     //   setErrorMessage('');
//     //  },2000)
//   })
 
// }
// const clearoldmembersTable=()=>{
//   setOldmembers([]);
// }
// const handleTrackChange=(e)=>{
//   const selectedTrackId = e.target.value;
// setTrackid(selectedTrackId );
// const selectedTrack = tracks.find(track => track._id === selectedTrackId);
// if (selectedTrack) {
//   setExistreviewers(selectedTrack.reviewers || []);
//   //console.log(existtopics);
//   //console.log(existreviewers);
// } else {
//   setExistreviewers([]);
// }
// }

//   return (
//     <div className="container mt-5">
//             <div className="row">
//             <p className="text-start conference-info">
//   <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conference_title}</span>
// </p>
//                 <div className="col-md-6">
//                  <div className="card">
//                   <div className="card-body">
//                   <div className="mb-3">
//                   <h2>Track</h2>
//                 <select
//                     //  className={"form-select mb-3"}
//                      value={trackid}
//                      onChange={handleTrackChange}
//                     className={`form-control ${errors.trackid ? 'is-invalid' : ''}`}
//                   >
//                     <option value="">Select Track</option>
                    
//                   {
//                     tracks.map(con=>
//                         <option key={con._id} value={con._id}>{con.track_name}</option>
//                        )
//                   }
//                   </select>
//                 <div className="invalid-feedback">{errors.trackid}</div>
//               </div>
//                   </div>
//                  </div>
//                     <div className="card">
                      
//                         <div className="card-body">
//                             <h2>Add Reviewers</h2>
//                             <form onSubmit={handleSubmit}>
                            
//                             <div className="mb-3">
//             <label htmlFor="name" className="form-label">Name:</label>
//             <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" value={name} onChange={(e) => setName(e.target.value)} />
//             <div className="invalid-feedback">{errors.name}</div>
//           </div>
//         {/* --------------------------------- */}
//           <div className="mb-3">
//             <label htmlFor="affiliation" className="form-label">Affiliation:</label>
//             <input type="text" className={`form-control ${errors.affiliation ? 'is-invalid' : ''}`} id="affiliation" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} />
//             <div className="invalid-feedback">{errors.affiliation}</div>
//           </div>
          
//           {/* <div className="mb-3">
//             <label htmlFor="place" className="form-label">Place:</label>
//             <input type="text" className={`form-control ${errors.place ? 'is-invalid' : ''}`} id="place" value={place} onChange={(e) => setPlace(e.target.value)} />
//             <div className="invalid-feedback">{errors.place}</div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="state" className="form-label">State:</label>
//             <input type="text" className={`form-control ${errors.state ? 'is-invalid' : ''}`} id="state" value={state} onChange={(e) => setState(e.target.value)} />
//             <div className="invalid-feedback">{errors.state}</div>
//           </div> */}
//           <div className="mb-3">
//             <label htmlFor="country" className="form-label">Country:</label>
//             <input type="text" className={`form-control ${errors.country ? 'is-invalid' : ''}`} id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
//             <div className="invalid-feedback">{errors.country}</div>
//           </div>
         
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password:</label>
//             <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <div className="invalid-feedback">{errors.password}</div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="mobile" className="form-label">Mobile:</label>
//             <input type="text" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
//             <div className="invalid-feedback">{errors.mobile}</div>
//           </div>
          
    
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email:</label>
//             <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <div className="invalid-feedback">{errors.email}</div>
//           </div>
//           <button type="submit" className="btn btn-primary">Add</button> &nbsp;
//           <button type="button" className="btn" style={{backgroundColor: 'teal',color:'white'}} onClick={clearFields}>Next</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-body">
//                             <h2>Old Reviewers</h2>
//                             {/* <div className="d-flex align-items-center mb-3">
//         <label htmlFor="Track" className="me-2">Track</label>
//         <select name="Track" id="Track" className="form-select form-select-sm">
        
//         </select>
//     </div>   */}
//                             <table className="table">
//                             <thead>
//             <tr>
              
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {oldmembers.map((member, index) => (
//               <tr key={index} onClick={() => populateMemberForm(member)}>
//                 <td>{member.name}</td>
//                 <td>{member.email}</td>
                
//               </tr>
//             ))}
//           </tbody>
//                             </table>
//                             <button className="btn btn-primary" onClick={getOldData}>Old Members</button>&nbsp;
//           {
//             oldmembers.length > 0 && ( <button type="button" className="btn btn-danger" onClick={clearoldmembersTable}>Clear</button> )
//           }
         
       
//                         </div>
//                     </div>
//                     <div className="card mt-3">
//                         <div className="card-body">
//                         {completionMessage && !errorMessage && (
//     <div className="alert alert-success" role="alert">
//         {completionMessage}
//     </div>
// )}

// {errorMessage && !completionMessage && (
//     <div className="alert alert-danger" role="alert">
//         {errorMessage}
//     </div>
// )}
//                             <h2>Reviewers For</h2>
//                             <table className="table">
//                             <thead>
//           <tr>
//           <th scope="col">Name</th>
//             <th scope="col">Email</th>
            
           
//           </tr>
//         </thead>
//         <tbody>
//         {existreviewers.map((reviewer, index) => (
//                                 <tr key={index}>
//                                     <td>{reviewer.name}</td>
//                                     <td>{reviewer.email}</td>
//                                 </tr>
//                             ))}
//             {newmembers.map((member, index) => (
//               <tr key={index} onClick={() => populateMemberForm(member)}>
//                 <td>{member.name}</td>
//                 <td>{member.email}</td>
                
//                 <td style={{ cursor: 'pointer' }} onClick={()=>delnewmwmber(index)}>&#10060;</td>
//               </tr>
//             ))}
//           </tbody>
//                             </table>
//                             {newmembers.length > 0 && (
//           <>
//             <button className="btn btn-primary" onClick={finalsave}>Save</button>&nbsp;
//             <button type="button" className="btn btn-danger" onClick={clearnewmembersTable}>Clear</button>
//           </>
//         )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default ReviewersRegistration
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { conferenceAndTrack,getallreviewersbytrackid,createReviewers,gellAllreviewersBeforDate } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

function ReviewersRegistration() {
  const data=useLoaderData();
  const conference_id=data;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);
  const [reviewers, setReviewers] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [oldReviewers, setOldReviewers] = useState([]);
  const [selectedOldReviewers, setSelectedOldReviewers] = useState(new Set());
  const [selecting, setSelecting] = useState(false);
  const [trackname,setTrackName]=useState();
  const [startIdx, setStartIdx] = useState(null);
  const [conferencename,setConferenceName]=useState();
  const [existreviewers,setExistreviewers]=useState([]);
  const [tracks,setTracks]=useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    country: '',
    mobile: '',
    googleScholarId: '',
    orcidId: ''
  });
  useEffect(() => {
    conferenceAndTrack(conference_id).then((response)=>{
     console.log(response.data);
     setConferenceName(response.data.conference_title);
     setTracks(response.data.tracks);
     setLoading(false);
    }).catch((err)=>{

    })
   

  }, []);
  const handleDeleteReviewer = (index) => {
    // Create a new array by filtering out the reviewer at the specified index
    const updatedReviewers = reviewers.filter((reviewer, i) => i !== index);
    // Update the state with the new array of reviewers
    setReviewers(updatedReviewers);
  };

  const handleTrackChange = (e) => {
    setSelectedTrack(e.target.value);
    const name=tracks.find(track=>track.id===e.target.value);
    setTrackName(name.name);
    getallreviewersbytrackid(e.target.value).then((Response)=>{
      setExistreviewers(Response.data);
      console.log(Response.data);
     
    }).catch((err)=>{

    })

  };


  const handleAddOldReviewers = () => {
    gellAllreviewersBeforDate().then((response)=>{
      setOldReviewers(response.data);
      console.log(response.data);
    }).catch((err)=>{

    })
    // setOldReviewers([
    //   { id: 1, name: 'John Doe', email: 'john.doe@example.com', affiliation: '123 Street, City', country: 'USA', mobile: '1234567890', googleScholarId: 'john.doe123', orcidId: '0000-0000-0000-0001' },
    //   { id: 2, name: 'Alice Smith', email: 'alice.smith@example.com', affiliation: '456 Avenue, Town', country: 'Canada', mobile: '9876543210', googleScholarId: 'alice.smith456', orcidId: '0000-0000-0000-0002' },
    //   { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', affiliation: '789 Boulevard, Village', country: 'UK', mobile: '4567890123', googleScholarId: 'bob.johnson789', orcidId: '0000-0000-0000-0003' },
    //   { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', affiliation: '234 Road, County', country: 'Australia', mobile: '7890123456', googleScholarId: 'emily.davis234', orcidId: '0000-0000-0000-0004' },
    //   { id: 5, name: 'Michael Wilson', email: 'michael.wilson@example.com', affiliation: '567 Lane, Borough', country: 'Germany', mobile: '2345678901', googleScholarId: 'michael.wilson567', orcidId: '0000-0000-0000-0005' },
    //   { id: 6, name: 'Sarah Brown', email: 'sarah.brown@example.com', affiliation: '890 Path, District', country: 'France', mobile: '3216549870', googleScholarId: 'sarah.brown890', orcidId: '0000-0000-0000-0006' },
    //   { id: 7, name: 'David Clark', email: 'david.clark@example.com', affiliation: '135 Place, Province', country: 'Italy', mobile: '6547893210', googleScholarId: 'david.clark135', orcidId: '0000-0000-0000-0007' },
    //   { id: 8, name: 'Laura Lewis', email: 'laura.lewis@example.com', affiliation: '246 Park, Region', country: 'Spain', mobile: '7894561230', googleScholarId: 'laura.lewis246', orcidId: '0000-0000-0000-0008' },
    //   { id: 9, name: 'James Walker', email: 'james.walker@example.com', affiliation: '357 Court, Area', country: 'Portugal', mobile: '1237894560', googleScholarId: 'james.walker357', orcidId: '0000-0000-0000-0009' },
    //   { id: 10, name: 'Linda Hill', email: 'linda.hill@example.com', affiliation: '468 Drive, Sector', country: 'Netherlands', mobile: '4561237890', googleScholarId: 'linda.hill468', orcidId: '0000-0000-0000-0010' },
    // ]);
  };

  const handleMouseDown = (index) => {
    setSelecting(true);
    setStartIdx(index);
    setSelectedOldReviewers(new Set([index]));
  };

  const handleMouseEnter = (index) => {
    if (selecting) {
      const newSelected = new Set();
      const start = Math.min(startIdx, index);
      const end = Math.max(startIdx, index);
      for (let i = start; i <= end; i++) {
        newSelected.add(oldReviewers[i].id);
      }
      setSelectedOldReviewers(newSelected);
    }
  };

  const handleMouseUp = () => {
    setSelecting(false);
  };

  const handleTransferSelectedReviewers = () => {
    if(!selectedTrack){
      alert("choose track first");
      return;
    }
    const selectedReviewers = oldReviewers.filter((reviewer) => selectedOldReviewers.has(reviewer.id));
    setReviewers((prevReviewers) => [...prevReviewers, ...selectedReviewers]);
    setSelectedOldReviewers(new Set());
  };

  const validateForm = () => {
    return (
      formData.name !== '' &&
      formData.email !== '' &&
      formData.affiliation !== '' &&
      formData.country !== '' &&
      formData.mobile !== '' &&
      formData.googleScholarId !== '' &&
      formData.orcidId !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!selectedTrack){
      alert("choose track first");
      return;
    }
    if (validateForm()) {
      setReviewers([...reviewers, { name: formData.name, email: formData.email, affiliation: formData.affiliation, country: formData.country, mobile: formData.mobile, googleScholarId: formData.googleScholarId,orcidId :formData.orcidId }]);
    } else {
      alert('Please fill all required fields.');
    }
  };

  // const handleSave = () => {
  //   console.log(reviewers);
  // };
  const handleSave=(e)=>{
  e.preventDefault();

  if(reviewers.length==0){
    alert("create reviewers");
    return;
  }
  setLoad(true);
  
  const transformedData = {
    "reviewers": reviewers.map(item => ({
        "name": item.name,
        "affiliation": item.affiliation,
        "country": item.country,
        // "password": item.password,
        "mobile": item.mobile,
        "email": item.email
    }))
};
console.log(transformedData);
  createReviewers(transformedData,selectedTrack).then((Response)=>{
    setSuccess(Response.data.message);
    
    
  }).catch((err)=>{
      console.log(err);
    alert(err.response.data.error);
    // setErrorMessage(err.response.data.message);
    // setTimeout(()=>{
    //   setErrorMessage('');
    //  },2000)
  })
  setLoad(false);
}

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
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="display-6">Conference Name: {conferencename}</p>
        </div>
        <div>
      <div className="form-floating">
        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" value={selectedTrack}
          onChange={handleTrackChange}>
          <option value="">Open this select menu</option>
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.name}
            </option>
          ))}
        </select>
        <label htmlFor="floatingSelect">Select Track</label>
      </div>
    </div>
      </div>
      {success && (
          <div className="alert alert-success" role="alert">
            Reviewers added successfully!
          </div>
        )}

      <form onSubmit={handleSubmit}>
        <div className="border">
          <div className="row g-2 m-4">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label htmlFor="email">Email<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
          </div>

          <div className="row g-2 m-4">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                />
                <label htmlFor="affiliation">Affiliation<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
                <label htmlFor="country">Country<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
                <label htmlFor="mobile">Mobile<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
          </div>
          <div className="row g-2 m-4">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="googleScholarId"
                  name="googleScholarId"
                  value={formData.googleScholarId}
                  onChange={(e) => setFormData({ ...formData, googleScholarId: e.target.value })}
                />
                <label htmlFor="googleScholarId">Google Scholar ID<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="orcidId"
                  name="orcidId"
                  value={formData.orcidId}
                  onChange={(e) => setFormData({ ...formData, orcidId: e.target.value })}
                />
                <label htmlFor="orcidId">ORCID ID<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
          </div>
          {/* Add button */}
          <div className="p-1 text-center">
            <button type="submit" className="btn btn-primary ">Add</button>
          </div>
        </div>
      </form>

      {/* Reviewers tables */}
      <div className="row mt-4">
        {/* Old Reviewers */}
        <div className="col-md border">
          <h1 className="display-6">Old Reviewers</h1>
          {/* Old Reviewers table */}
          <div className="table-container mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through the reviewers array and render each reviewer */}
                {oldReviewers.map((reviewer, index) => (
                  <tr
                    key={reviewer.id}
                    className={selectedOldReviewers.has(reviewer.id) ? 'table-primary' : ''}
                    onMouseDown={() => handleMouseDown(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseUp={handleMouseUp}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{reviewer.name}</td>
                    <td>{reviewer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Buttons */}
          <div>
            <button type="button" className="btn btn-primary m-4" onClick={handleAddOldReviewers}>Load Old Reviewers</button>
            <button type="button" className="btn btn-primary m-4" onClick={handleTransferSelectedReviewers}>Add Selected</button>
          </div>
        </div>

        {/* Reviewers For */}
        <div className="col-md border">
          <h1 className="display-6">Reviewers For {trackname}</h1>
          {/* Reviewers For table */}
          <div className="table-container mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {existreviewers.map((reviewer, index) => (
      <tr key={index}>
        <td>{reviewer.name}</td>
        <td>{reviewer.email}</td>
        <td></td> {/* Empty column for delete button */}
      </tr>
    ))}
          {reviewers.map((reviewer, index) => (
            <tr key={index}>
              <td>{reviewer.name}</td>
              <td>{reviewer.email}</td>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => handleDeleteReviewer(index)}
                >
                  &#x2715; {/* Cross symbol */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
          {/* Save button */}
          <div className='text-center'>
            <button type="button" className="btn btn-primary m-4 text" onClick={handleSave}>Save</button>
          </div>
          {load && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

export default ReviewersRegistration;

