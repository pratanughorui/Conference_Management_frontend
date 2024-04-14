import axios from "axios";
const REST_API_BASE_URL="http://localhost:9090/conference/getAllConference";
export const listConference=()=>axios.get(REST_API_BASE_URL);  
//create authors
export const createAuthorWork = (authorwork,topicid,conferenceId,CoAuthors) => {
     const formData = new FormData();
     formData.append("pdfFiles",authorwork.pdfFile);
     const authorData = {
      name: authorwork.name,
      address: authorwork.address,
      state: authorwork.state,
      country: authorwork.country,
      cont_no: authorwork.contactNumber,
      email: authorwork.email,
      title: authorwork.title,
      track: authorwork.track,
      key_words: authorwork.keywords,
      abstractText: authorwork.abstract,
      // CoAuthors: CoAuthors  // Pass the coAuthors array directly
    };
  
    // Convert authorData object to JSON string
    const x = JSON.stringify(authorData);
     formData.append("name",x);
     formData.append("coauthor",JSON.stringify(CoAuthors));
    return axios.post(`http://localhost:9090/authors/uploadwork/${topicid}/${conferenceId}`,formData);
  };
export const createConference=(conference)=>{
   return axios.post('http://localhost:9090/conference/createConference',conference);
};
//get all conference between recent date
export const listConferenceBtwDate=()=>{
  return axios.get('http://localhost:9090/conference/getAllConferencebtwdate');
}
// create track
export const createTracks=(conferenceId,tracks)=>{
  
  return axios.post(`http://localhost:9090/track/createtrack/${conferenceId}`,tracks);
}
//get all tracks
export const getalltracks=(conferenceid)=>{
  return axios.get(`http://localhost:9090/track/getalltracks/${conferenceid}`);
}
//get all reviewers by track
export const getallreviewersbytrack=(track_id)=>{
  return axios.get(`http://localhost:9090/Reviewer/getallreviwersbytrack/${track_id}`)
}


// create topic
export const createTopics=(trackId,topics)=>{
  return axios.post(`http://localhost:9090/topic/createtopic/${trackId}`,topics);
}


//call all roles
export const gellAllRoles=()=>axios.get('http://localhost:9090/role/getallrole');

//create committee members

export const createCommitteeMembers=(members,conference_id,committee_id)=>{
   return axios.post(`http://localhost:9090/user/createuser/${committee_id}/${conference_id}`,members);
}
export const createReviewers=(members,conference_id)=>{
  return axios.post(`http://localhost:9090/Reviewer/createreviewer/${conference_id}`,members);
}

//fetch all users before recent date

export const gellAllusersBeforDate=()=>axios.get('http://localhost:9090/user/getallusersbeforerecentdate');

//fetch all authors using conferenceid
export const gellAllAuthors=(conference_id)=>{
  return axios.get(`http://localhost:9090/authors/getallauthors/${conference_id}`);
}
//fetch all reviewers using conferenceid
export const gellAllReviewers=(conference_id)=>{
  return axios.get(`http://localhost:9090/Reviewer/getallreviwers/${conference_id}`);
}
export const gellAllreviewersBeforDate=()=>axios.get('http://localhost:9090/Reviewer/getallreviewersbeforerecentdate');

//create committee
export const createCommittee=(conferenceId,committee)=>{
  return axios.post(`http://localhost:9090/committee/createcommittee/${conferenceId}`,committee)
}

//create paper allotments
export const createPaperallot=(informationdb)=>{
  return axios.post(`http://localhost:9090/allotment/papersallot`,informationdb)
}

export const emailsend=(topic_id,date,name,designation)=>{
  const data={date,name,designation};
  return axios.post(`http://localhost:9090/Email/send/${topic_id}`,data)
}

export const fetchreviewer=(reviewerId)=>{
  return axios.get(`http://localhost:9090/Reviewer/getreviewerbyid/${reviewerId}`);
}

export const getAllConference=()=>{
  return axios.get(`http://localhost:9090/conference/getAllConference`)
}
export const setConferenceToSession=(conference_id)=>{
  return axios.get(`http://localhost:9090/conference/setSessionData/${conference_id}`,{withCredentials:true});
}

export const getConferencefromsession=()=>{
  return axios.get(`http://localhost:9090/conference/getConferenceFromSession`,{withCredentials:true});
}

export const getConferenceById=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`http://localhost:9090/conference/getConference/${conference_id}`)
}

export const getpdf = (authorId) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:9090/pdf/${authorId}`, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      resolve(url);
    })
    .catch((error) => {
      console.error('Error fetching PDF:', error);
      reject(error);
    });
  });
};

export const fetchauthorwork=(id)=>{
return axios.get(`http://localhost:9090/authors/getauthorwork/${id}`);
}