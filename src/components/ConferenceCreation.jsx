import React,{useState} from 'react'
import { createConference } from '../Services/ConferenceServices';
import { useNavigate } from 'react-router-dom';

const ConferenceCreation = () => {
  const navigate = useNavigate();
    const [conferences_title, setConferences_title] = useState('');
    const [shortname, setShortname] = useState('');
    const [expectPaper, setExpectPaper] = useState('');
    const [website, setWebsite] = useState('');
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');
    const [place, setPlace] = useState('');
 const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [datecallpaper, setDatecallpaper] = useState('');
  const [lastdatesubpaper, setLastdatesubpaper] = useState('');
  const [dateofallotpaper, setDateofallotpaper] = useState('');
  const [lastdaterevsub, setLastdaterevsub] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [errors, setErrors] = useState({
    conferences_title: '',
    // subject: '',
    venue: '',
    place: '',
    country: '',
    fromDate: '',
    toDate: ''
    
  });
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const newErrors = {};
    if (!conferences_title) newErrors.conferences_title = 'Conference title is required.';
    // if (!subject) newErrors.subject = 'This is required.';
    if (!venue) newErrors.venue = 'this is required.';
    if (!place) newErrors.place = 'this is required.';
    if (!country) newErrors.country = 'this is required.';
    if (!fromDate) newErrors.fromDate = 'thise is required.';
    if (!toDate) newErrors.toDate = 'this is required.';
    if (!datecallpaper) newErrors.datecallpaper = 'this is required.';
    if (!lastdatesubpaper) newErrors.lastdatesubpaper = 'this is required.';
    if (!dateofallotpaper) newErrors.dateofallotpaper = 'this is required.';
    if (!lastdaterevsub) newErrors.lastdaterevsub = 'this is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    console.log("fff");
    //const conference={conferences_title,shortname,website,venue,address,place,state,country,fromDate,toDate,datecallpaper,lastdatesubpaper,dateofallotpaper,lastdaterevsub,expectPaper};
    //console.log(conference);
    const conference={
      conference_title: conferences_title,
      short_name: shortname,
      website: website,
      venue: venue,
      address: address,
      place: place,
       state: state,
      country: country,
  from_date: fromDate,
  to_date: toDate,
  last_date_paper_sub: lastdatesubpaper,
  date_allot_paper_torev: dateofallotpaper,
  last_date_review_sub: lastdaterevsub,
  number_of_papers: expectPaper
    }
    console.log(conference);
    createConference(conference).then((Response)=>{
      console.log(Response.data);
      setCompletionMessage('Conference created successfully!');
      setConferences_title('');
      setWebsite('');
      setShortname('');
      setAddress('');
      setState('');
      setVenue('');
      setExpectPaper('');
      setPlace('');
      setCountry('');
      setFromDate('');
      setToDate('');
      setDatecallpaper('');
      setDateofallotpaper('');
      setLastdaterevsub('');
      setLastdatesubpaper('');
      // setTimeout(()=>{
      //   navigate(-1);
  
      // },2000);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scroll behavior
        });
      }, 1000);
    }).catch((err)=>{
      // console.log("love");
      console.log(err);
    })
   
  };
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Create Conference</h3>
            {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
            <form onSubmit={handleFormSubmit}>
              <label className="form-label">Conference Title:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.conferences_title ? 'is-invalid' : ''}`}
                value={conferences_title}
                onChange={(e) => setConferences_title(e.target.value)}
              />
               <div className="invalid-feedback">{errors.conferences_title}</div>

               <label className="form-label">Short Name:</label>
              <input
                type="text"
                className="form-control mb-3"
                value={shortname}
                onChange={(e) => setShortname(e.target.value)}
              />
               

              <label className="form-label">Webside:</label>
              <input
                type="text"
                className={"form-control mb-3"}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
                {/* <div className="invalid-feedback">{errors.subject}</div> */}
              <label className="form-label">Venue:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.venue ? 'is-invalid' : ''}`}
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
 <div className="invalid-feedback">{errors.venue}</div>
 {/* -------------------------------------------------------------------------------------------- */}
 <label className="form-label">Address:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.venue ? 'is-invalid' : ''}`}
                value={address}
               onChange={(e) => setAddress(e.target.value)}
              />
 <div className="invalid-feedback">{errors.venue}</div>
 {/* ------------------------------------------------------------------- */}
              <label className="form-label">Place:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.place ? 'is-invalid' : ''}`}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
 <div className="invalid-feedback">{errors.place}</div>
 {/* -------------------------------------------------------------------------------------------- */}
 <label className="form-label">State:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.venue ? 'is-invalid' : ''}`}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
 <div className="invalid-feedback">{errors.venue}</div>
 {/* ------------------------------------------------------------------- */}
              <label className="form-label">Country:</label>
              <input
                type="text"
                className={`form-control mb-3 ${errors.country ? 'is-invalid' : ''}`}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
 <div className="invalid-feedback">{errors.country}</div>
              <label className="form-label">From Date:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.fromDate ? 'is-invalid' : ''}`}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
 <div className="invalid-feedback">{errors.fromDate}</div>
              <label className="form-label">To Date:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.toDate ? 'is-invalid' : ''}`}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
 <div className="invalid-feedback">{errors.toDate}</div>
 {/* ---------------------------------------------------------------------------------- */}
 <label className="form-label">Date of call for paper:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.datecallpaper ? 'is-invalid' : ''}`}
                value={datecallpaper}
                onChange={(e) => setDatecallpaper(e.target.value)}
              />
 <div className="invalid-feedback">{errors.datecallpaper}</div>
 <label className="form-label">Last date for submission of paper:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.lastdatesubpaper ? 'is-invalid' : ''}`}
                value={lastdatesubpaper}
                onChange={(e) => setLastdatesubpaper(e.target.value)}
              />
 <div className="invalid-feedback">{errors.lastdatesubpaper}</div>
 <label className="form-label">Date of allotment of papers to Reviewers:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.dateofallotpaper ? 'is-invalid' : ''}`}
                value={dateofallotpaper}
                onChange={(e) => setDateofallotpaper(e.target.value)}
              />
 <div className="invalid-feedback">{errors.dateofallotpaper}</div>
 <label className="form-label">Last date for review submission:</label>
              <input
                type="date"
                className={`form-control mb-3 ${errors.lastdaterevsub ? 'is-invalid' : ''}`}
                value={lastdaterevsub}
                onChange={(e) => setLastdaterevsub(e.target.value)}
              />
 <div className="invalid-feedback">{errors.lastdaterevsub}</div>
 {/* ------------------------------------------------------------------- */}
 <div className="mb-3">
                            <label className="form-label d-block">How many submission do you expect</label>
                           
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radioOption" id="radioOption3" value="<100" checked={expectPaper === "<100"} onChange={(e) => setExpectPaper(e.target.value)} />
                                <label className="form-check-label" htmlFor="radioOption3">&lt;100</label>
                            </div><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radioOption" id="radioOption4" value="<500" onChange={(e) => setExpectPaper(e.target.value)}/>
                                <label className="form-check-label" htmlFor="radioOption4">&lt;500</label>
                            </div><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radioOption" id="radioOption5" value="<1000" onChange={(e) => setExpectPaper(e.target.value)}/>
                                <label className="form-check-label" htmlFor="radioOption5">&lt;1000</label>
                            </div><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radioOption" id="radioOption6" value="<2000" onChange={(e) => setExpectPaper(e.target.value)}/>
                                <label className="form-check-label" htmlFor="radioOption6">&lt;2000</label>
                            </div><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radioOption" id="radioOption7" value="<5000" onChange={(e) => setExpectPaper(e.target.value)}/>
                                <label className="form-check-label" htmlFor="radioOption7">&lt;5000</label>
                            </div><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radioOption" id="radioOption8" value="<10000" onChange={(e) => setExpectPaper(e.target.value)}/>
                                <label className="form-check-label" htmlFor="radioOption8">&lt;10000</label>
                            </div><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="radioOption" id="radioOption9" value="option1" onChange={(e) => setExpectPaper(e.target.value)}/>
                                <label className="form-check-label" htmlFor="radioOption9">&lt;20000</label>
                            </div>
                            
                        </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ConferenceCreation