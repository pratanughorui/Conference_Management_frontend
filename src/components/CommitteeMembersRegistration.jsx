// import React,{useState,useEffect} from 'react'
// import { createAuthorWork, listConference,gellAllRoles,createCommitteeMembers,gellAllusersBeforDate,listConferenceBtwDate } from '../Services/ConferenceServices';
// import { useLoaderData,useNavigate } from 'react-router-dom';

// const CommitteeMembersRegistration = () => {

//   const data=useLoaderData();
//   const conference=data.data;
//   const[role,setRoles]=useState([])
//   const [conferenceId, setConferenceId] = useState('');
//   const [completionMessage, setCompletionMessage] = useState(''); 
//     const [errorMessage,setErrorMessage]=useState('');
//   const [roleId, setRoleId] = useState('');
//   const[committee,setCommittee]=useState([]);
//   const[committeeId,setCommitteeId]=useState('');
//   const[committeeName,setCommitteeName]=useState('');
//   const [existmembers,setExistMembers]=useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!conference || Object.keys(conference).length === 0) {
//       // If conference data is empty, show popup or navigate back
//       alert('Conference data is empty. Please go back and select a conference.');
//       navigate("/"); // Navigate back to previous page
//     }
//   }, [conference, navigate]);
//   // useEffect(()=>{
//   //  //fetchconference();
//   //  fetchRoles();
//   // },[]);

//   useEffect(()=>{
//     if(conference){
//       setCommittee(conference.committee);
      
//       //setExistMembers(conference.committee.members);
//     }
//   },[conference]);
//   //  const fetchconference = () => {
//   //   listConferenceBtwDate().then((Response)=>{
//   //      setConference(Response.data);
//   //      console.log(Response.data);
//   //    }).catch((err)=>{
//   //       console.log(err);
//   //    })
//   //  };
//   //  const fetchRoles=()=>{
//   //   gellAllRoles().then((Response)=>{
//   //     setRoles(Response.data); 
//   //   }).catch((err)=>{
//   //     console.log(err);
//   //  })
//   //  }
//     const [members, setMembers] = useState([]);
//     const[newmembers,setNewmembers]=useState([]);
//     const [name, setName] = useState('');
//     const [address, setAddress] = useState('');
//     const [place, setPlace] = useState('');
//     const [state, setState] = useState('');
//     const [country, setCountry] = useState('');
//     const [password, setPassword] = useState('');
//     const [mobile, setMobile] = useState('');
//     //const [conferenceName, setConferenceName] = useState('');
//     const [roleName, setRoleName] = useState('');
//     const [email, setEmail] = useState('');
//     const [errors, setErrors] = useState({
//      // conferenceName: '',
//       committeeId:'',
//       roleName:'',
//       name: '',
//       address: '',
//       place: '',
//       state: '',
//       country: '',
//       mobile: '',
//       email: '',
//       password: '',
//     });
// // ----------------------------------------data submission-----------------------------------
//     const finalsave=(e)=>{
//       e.preventDefault();
//       //console.log(newmembers);
 
//       const transformedData = {
//         "members": newmembers.map(item => ({
//           "name": item.name,
//           "address":item.address,
//           "place":item.place,
//           "state":item.state,
//           "country": item.country,
//           "password": item.password,
//           "mobile": item.mobile,
//           "role":item.roleName,
//           "email": item.email
//         }))
//     };
//     console.log(transformedData);
//       createCommitteeMembers(transformedData,committeeId).then((Response)=>{
//         alert(Response.data.message);
//         window.location.reload();
//     }).catch((error)=>{
//        console.log(error);
//     })
//     // setTimeout(()=>{
//     //   setCompletionMessage('');
//     // },3000)
//     }
//     let [count,setCount]=useState(0);
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Add new member to the list
//       const newErrors = {};
//       //if (!conferenceName) newErrors.conferenceName = 'Conference name is required.';
//       if (!name) newErrors.name = 'Name is required.';
//       if (!address) newErrors.address = 'Address is required.';
//       if (!place) newErrors.place = 'place is required.';
//       if (!state) newErrors.state = 'state is required.';
//       if (!country) newErrors.country = 'country is required.';
//       if (!mobile) newErrors.mobile = 'Contact number is required.';
//       if (!email) newErrors.email = 'Email is required.';
//       if (!password) newErrors.password = 'Password is required.';
//       if (!roleName) newErrors.roleName = 'roleName is required.';
//       if (!committeeId) newErrors.committeeId = 'committeeId is required.';

//       setErrors(newErrors);
//       // If there are any errors, stop form submission
//       if (Object.keys(newErrors).length > 0) {
//         //console.log("ff");
//         return;
//       }
// //submission code

// if(count===0){
//   setCount(committeeId);
//   console.log(count);
// }else if(count != committeeId){
//     setErrorMessage("multiple track not allowed");
//     setTimeout(()=>{
//       setErrorMessage('');
//      },2000)
//     return;
// }
// if(newmembers.length>0 && newmembers.findIndex(iteam=>iteam.email===email && iteam.committeeId===committeeId)!=-1){
//   setErrorMessage("repeated");
//     setTimeout(()=>{
//       setErrorMessage('');
//      },2000)
  
//   return;
// }
//      const member_details={name,address,place,state,country,password,mobile,email,roleName,committeeId}
     
//     //  setNewmembers([...newmembers,member_details]);
//     newmembers.push(member_details);
//      console.log(newmembers);


    
//     };
//     const handleRoleChange = (e) => {
//       const selectedRole = role.find(conf => conf.role_name === e.target.value);
//       if (selectedRole) {
//         setRoleId(selectedRole.role_id);
//       }
//       setRoleName(e.target.value);
//     };
//     const clearFields = () => {
//       setName('');
//       setAddress('');
//       setPlace('');
//       setState('');
//       setCountry('');
//       setPassword('');
//       setMobile('');
//       setEmail('');
//       setRoleName('');
//       setCommitteeId('');
//       setCommitteeName('');
//   };
//   const getOldData=()=>{
//     gellAllusersBeforDate().then((Response)=>{
//       //  console.log(Response.data);
//       setMembers(Response.data);
//     }).catch((err)=>{
//       console.log(err);
//     });
//   }
//   const clearmembersTable=()=>{
//     setMembers([]);
//   }
//   const clearnewmembersTable=()=>{
//     setNewmembers([]);
//     setCount(0);
//   }
//   const populateMemberForm = (member) => {
//     setName(member.name);
//     setAddress(member.address);
//     setPlace(member.place);
//     setState(member.state);
//     setRoleName(member.roleName)
//     setCountry(member.country);
//     setPassword(member.password);
//     setMobile(member.mobile);
//     setEmail(member.email);
// };
// const delnewmwmber=(index)=>{
//   const updatedMembers = [...newmembers];
//     // Remove the member at the specified index
//     updatedMembers.splice(index, 1);
//     // Update the state with the updated array
//     setNewmembers(updatedMembers);
//     if(updatedMembers.length==0){
//       setCount(0);
//     }
// }
// const handleCommitteeChange=(e)=>{
//   console.log(e.target.value);
//   const selectedcom=e.target.value;
//   setCommitteeId(selectedcom);
//   const selectedcomm = committee.find(committee => committee._id === selectedcom);
// if (selectedcomm) {
//   setExistMembers(selectedcomm.members || []);
//   //console.log(existtopics);
//   //console.log(existmembers);
// } else {
//   setExistMembers([]);
// }
// //  console.log(committee[e.target.selectedIndex-1]);
// //  let ind=committee[e.target.selectedIndex-1];
// //  if(ind!=0){
// //   setCommitteeId(committee[e.target.selectedIndex-1].committee_id);
// //   setCommitteeName(e.target.value)
// //  }else{
// //   setCommittee('');
// //  }
 


// }

//   return (
//     <div className="container mt-5">
//             <div className="row">
//             <p className="text-start conference-info">
//   <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'teal' }}>Conference Name: {conference.conference_title}</span>
// </p>
//                 <div className="col-md-6">
//                   <div className="card">
//                     <div className="card-body">
//                       <label htmlFor="committee" className="form-label">Committee:</label>
//                       <select
//                     className={`form-control ${errors.committeeId ? 'is-invalid' : ''}`}
//                      value={committeeId}
//                     onChange={handleCommitteeChange}
                    
//                   >
//                     <option value="">Select Committee</option>
                    
//                     {committee.map(con => (
//                           <option key={con._id} value={con._id}>
//                                {con.committee_name}

//                       </option>
//                       // <option key={con._id} value={con._id}>{con.track_name}</option>
//                      ))}
//                   </select>
//                   <div className="invalid-feedback">{errors.committeeId}</div>
//                     </div>
                    
//                   </div>
//                     <div className="card">
                    
//                         <div className="card-body">
//                             <h2>Add Member</h2>
//                             <form onSubmit={handleSubmit}>
//                               {/* <div className='mb-3'>
//                               <label htmlFor="conference name" className="form-label">Conference Name:</label> 
//                             <input type="text" className="form-control"  value={conference.conferences_title} disabled/>  
//                               </div> */}
//                             <div className="mb-3">
                            
//             <label htmlFor="name" className="form-label">Name:</label>
//             <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" value={name} onChange={(e) => setName(e.target.value)} />
//             <div className="invalid-feedback">{errors.name}</div>
//           </div>
        
//           <div className="mb-3">
//             <label htmlFor="address" className="form-label">Address:</label>
//             <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
//             <div className="invalid-feedback">{errors.address}</div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="place" className="form-label">Place:</label>
//             <input type="text" className={`form-control ${errors.place ? 'is-invalid' : ''}`} id="place" value={place} onChange={(e) => setPlace(e.target.value)} />
//             <div className="invalid-feedback">{errors.place}</div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="state" className="form-label">State:</label>
//             <input type="text" className={`form-control ${errors.state ? 'is-invalid' : ''}`} id="state" value={state} onChange={(e) => setState(e.target.value)} />
//             <div className="invalid-feedback">{errors.state}</div>
//           </div>
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
//           {/* <label className="form-label">Conference Name:</label>
//                 <select
//                     className={`form-control ${errors.conferenceName ? 'is-invalid' : ''}`}
//                     value={conferenceName}
//                     onChange={handleConferenceChange}
                    
//                   >
//                     <option value="">Select Conference</option>
                    
//                   {
//                     conference.map(con=>
//                         <option value={con.conferences_title}>{con.conferences_title}</option>
//                        )
//                   }
//                   </select>
//                 <div className="invalid-feedback">{errors.roleName}</div> */}
//           </div>
//           <div className="mb-3">
//           <label className="form-label">Roles:</label>
                
//                   <input type="text" className={`form-control ${errors.roleName ? 'is-invalid' : ''}`} id="role" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
//                 <div className="invalid-feedback">{errors.roleName}</div>
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
//                             <h2>Old Members</h2>
//                             <table className="table">
//                             <thead>
//             <tr>
//               <th scope="col">Email</th>
//               <th scope="col">Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {members.map((member, index) => (
//               <tr key={index} onClick={() => populateMemberForm(member)}>
//                 <td>{member.email}</td>
//                 <td>{member.name}</td>
//               </tr>
//             ))}
//           </tbody>
//                             </table>
//                             <button className="btn btn-primary" onClick={getOldData}>Old Members</button>&nbsp;
//         {/* <button type="button" className="btn btn-danger" onClick={clearmembersTable}>Clear</button>  */}
//         {
//           members.length > 0 && ( <button type="button" className="btn btn-danger" onClick={clearmembersTable}>Clear</button> )
//         }
//                         </div>
//                     </div>
//                     <div className="card mt-3">
//                     {completionMessage && !errorMessage && (
//     <div className="alert alert-success" role="alert">
//         {completionMessage}
//     </div>
// )}

// {errorMessage && !completionMessage && (
//     <div className="alert alert-danger" role="alert">
//         {errorMessage}
//     </div>
// )}
//                         <div className="card-body">
//                             <h2>Members For <span>{committeeName}</span></h2>
//                             <table className="table">
//                             <thead>
//             <tr>
//               <th scope="col">Email</th>
//               <th scope="col">Name</th>
              
//             </tr>
//           </thead>
//           <tbody>
//           {existmembers.map((member, index) => (
//                                 <tr key={index}>
//                                   <td>{member.email}</td>
//                                     <td>{member.name}</td>
//                                 </tr>
//                             ))}
//             {newmembers.map((member, index) => (
//               <tr key={index} onClick={() => populateMemberForm(member)}>
//                 <td>{member.email}</td>
//                 <td>{member.name}</td>
//                 <td style={{ cursor: 'pointer' }} onClick={()=>delnewmwmber(index)}>&#10060;</td>
//               </tr>
//             ))}
//           </tbody>
//                             </table>
//                             {newmembers.length > 0 && (
//   <>
//     <button className="btn btn-primary" onClick={finalsave}>Save</button>&nbsp;
//     <button type="button" className="btn btn-danger" onClick={clearnewmembersTable}>Clear</button>
//   </>
// )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default CommitteeMembersRegistration

import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { createCommitteeMembers } from '../Services/ConferenceServices';


function CommitteeMembersRegistration() {
  const [loading, setLoading] = useState(false);
  const [Committees, setCommittees] = useState([]);
  const [saveloading, setsaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCommitteeId, setSelectedCommitteeId] = useState('');
  const [selectedCommitteeName, setSelectedCommitteeName] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    place: '',
    state: '',
    country: '',
    mobile: '',
    role: ''
  });

  useEffect(() => {
    // getCommittees().then((Response) => {
    //   setCommittees(Response.data);
    // }).catch((err) => {
    //   console.log(err);
    // }).finally(() => {
    //   setLoading(false);
    // });
  }, []);

  const handleCommitteeChange = (event) => {
    const selectedId = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    setSelectedCommitteeId(selectedId);
    setSelectedCommitteeName(selectedName);
  };

  const [reviewers, setReviewers] = useState([]);
  const [oldReviewers, setOldReviewers] = useState([]);
  const [selectedOldReviewers, setSelectedOldReviewers] = useState(new Set());
  const [selecting, setSelecting] = useState(false);
  const [startIdx, setStartIdx] = useState(null);

  const handleAddOldReviewers = () => {
    setOldReviewers([
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '123 Street, City', country: 'USA', mobile: '1234567890', googleScholarId: 'john.doe123', orcidId: '0000-0000-0000-0001' },
      { id: 2, name: 'Alice Smith', email: 'alice.smith@example.com', address: '456 Avenue, Town', country: 'Canada', mobile: '9876543210', googleScholarId: 'alice.smith456', orcidId: '0000-0000-0000-0002' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', address: '789 Boulevard, Village', country: 'UK', mobile: '4567890123', googleScholarId: 'bob.johnson789', orcidId: '0000-0000-0000-0003' },
      { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', address: '234 Road, County', country: 'Australia', mobile: '7890123456', googleScholarId: 'emily.davis234', orcidId: '0000-0000-0000-0004' },
      // { id: 5, name: 'Michael Wilson', email: 'michael.wilson@example.com', address: '567 Lane, Borough', country: 'Germany', mobile: '2345678901', googleScholarId: 'michael.wilson567', orcidId: '0000-0000-0000-0005' },
      // { id: 6, name: 'Sarah Brown', email: 'sarah.brown@example.com', address: '890 Path, District', country: 'France', mobile: '3216549870', googleScholarId: 'sarah.brown890', orcidId: '0000-0000-0000-0006' },
      // { id: 7, name: 'David Clark', email: 'david.clark@example.com', address: '135 Place, Province', country: 'Italy', mobile: '6547893210', googleScholarId: 'david.clark135', orcidId: '0000-0000-0000-0007' },
      // { id: 8, name: 'Laura Lewis', email: 'laura.lewis@example.com', address: '246 Park, Region', country: 'Spain', mobile: '7894561230', googleScholarId: 'laura.lewis246', orcidId: '0000-0000-0000-0008' },
      // { id: 9, name: 'James Walker', email: 'james.walker@example.com', address: '357 Court, Area', country: 'Portugal', mobile: '1237894560', googleScholarId: 'james.walker357', orcidId: '0000-0000-0000-0009' },
      // { id: 10, name: 'Linda Hill', email: 'linda.hill@example.com', address: '468 Drive, Sector', country: 'Netherlands', mobile: '4561237890', googleScholarId: 'linda.hill468', orcidId: '0000-0000-0000-0010' },
    ]);
    // gellAllusersBeforDate().then((Response)=>{
    //   setOldReviewers(Response.data);
    // }).catch((err)=>{
    //   console.log(err);
    // })
  };
// ------------------------

const handleMouseDown = (index) => {
  setSelecting(true);
  setStartIdx(index);
  setSelectedOldReviewers(new Set([index]));
};

const handleMouseEnter = (index) => {
  if (selecting) {
    const newSelected = new Set(selectedOldReviewers);
    const start = Math.min(startIdx, index);
    const end = Math.max(startIdx, index);
    for (let i = start; i <= end; i++) {
      newSelected.add(i);
    }
    setSelectedOldReviewers(newSelected);
  }
};

const handleMouseUp = () => {
  setSelecting(false);
};

// Add or remove individual row selection
const handleRowClick = (index) => {
  const newSelected = new Set(selectedOldReviewers);
  if (newSelected.has(index)) {
    newSelected.delete(index);
  } else {
    newSelected.add(index);
  }
  setSelectedOldReviewers(newSelected);
};

const handleTransferSelectedReviewers = () => {
  const selectedReviewers = oldReviewers.filter((_, index) => selectedOldReviewers.has(index));
  setReviewers((prevReviewers) => [...prevReviewers, ...selectedReviewers]);
  setSelectedOldReviewers(new Set());
};
// -----------------
 

  
  // const handleTransferSelectedReviewers = () => {
  //   const selectedReviewers = oldReviewers.filter((reviewer) => selectedOldReviewers.has(reviewer.id));
  //   setReviewers((prevReviewers) => [...prevReviewers, ...selectedReviewers]);
  //   setSelectedOldReviewers(new Set());
  // };

  const validateForm = () => {
    return (
      formData.name !== '' &&
      formData.email !== '' &&
      formData.address !== '' &&
      formData.country !== '' &&
      formData.mobile !== '' &&
      formData.place !== '' &&
      formData.role !== '' &&
      formData.state !== ''
    );
  };
  const fieldsEmpty = () => {
    setFormData({
      name: '',
      email: '',
      address: '',
      place: '',
      state: '',
      country: '',
      mobile: '',
      role: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      if (!selectedCommitteeId) {
        alert('Select Committee');
        return;
      }
      
      // Check if the email already exists in the reviewers array
      const isEmailExists = reviewers.some((reviewer) => reviewer.email === formData.email);
      
      if (isEmailExists) {
        alert('Email already exists in the list.');
        return;
      }
  
      setReviewers([...reviewers, { ...formData }]);
      fieldsEmpty();
    } else {
      alert('Please fill all required fields.');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setsaveLoading(true)
    const transformedData = {
      "members": reviewers.map(item => ({
        "name": item.name,
        "address":item.address,
        "place":item.place,
        "state":item.state,
        "country": item.country,
        "mobile": item.mobile,
        "role":item.role,
        "email": item.email
      }))
      
  };
  createCommitteeMembers(transformedData,selectedCommitteeId).then(()=>{
     setReviewers([]);
     setSuccess(true);
     window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll behavior
    });
  }).catch((err)=>{
  console.log(err);
  }).finally(()=>{
    setsaveLoading(false);
  })
  console.log(transformedData);
  };
  const handleClose=()=>{
    setReviewers([]);
  }
  const handleDeleteReviewer = (index) => {
    setReviewers((prevReviewers) => {
      // Create a new array by filtering out the reviewer at the specified index
      return prevReviewers.filter((_, i) => i !== index);
    });
  };
  

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
    <div className="container  text-primary-emphasis p-4 mt-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="display-6">Conference Name:</p>
        </div>
        <div>
          <div className="form-floating">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={handleCommitteeChange}
            >
              <option selected>Open this select menu</option>
              {Committees.map((con) => (
                <option key={con._id} value={con._id}>{con.committee_name}</option>
              ))}
            </select>
            <label htmlFor="floatingSelect">Select Committee</label>
          </div>
        </div>
      </div>
      {success && (
          <div className="alert alert-success" role="alert">
            Members are submitted successfully!
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <div className='border'>
          <div className="row g-2 m-4">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <label htmlFor="address">Address<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                />
                <label htmlFor="place">Place<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <label htmlFor="state">State<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
          </div>
          <div className="row g-2 m-4">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
                <label htmlFor="mobile">Mobile<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                />
                <label htmlFor="role">Role<span style={{ color: 'red' }}>*</span></label>
              </div>
            </div>
          </div>
          <div className="p-1">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>

      {/* Reviewers tables */}
      <div className="row mt-4">
        {/* Old Reviewers */}
        <div className="col-md border">
          <h1 className="display-6">Old Members</h1>
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
  className={selectedOldReviewers.has(index) ? 'table-primary' : ''}
  onMouseDown={() => handleMouseDown(index)}
  onMouseEnter={() => handleMouseEnter(index)}
  onMouseUp={handleMouseUp}
  onClick={() => handleRowClick(index)} // Use handleRowClick here
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
            <button type="button" className="btn btn-primary m-4" onClick={handleAddOldReviewers}>Old members</button>
            <button type="button" className="btn btn-primary m-4" onClick={handleTransferSelectedReviewers}>Add</button>
          </div>
        </div>

        {/* Reviewers For */}
        <div className="col-md border">
          <h1 className="display-6">Members For {selectedCommitteeName}</h1>
          {/* Reviewers For table */}
          <div className="table-container mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-striped">
              <thead className="sticky-top">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Render additional reviewers here */}
                {reviewers.map((reviewer,index) => (
                  <tr key={index}>
                    <td>{reviewer.name}</td>
                    <td>{reviewer.email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteReviewer(index)}
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Save button */}
          <div>
            <button type="button" className="btn btn-primary m-4" onClick={handleSave}>Save</button>
            <button type="button" class="btn btn-danger" onClick={handleClose}>Close</button>
          </div>
          {saveloading && (
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

export default CommitteeMembersRegistration;
