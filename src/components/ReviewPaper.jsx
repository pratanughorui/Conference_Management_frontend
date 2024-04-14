import React,{ useState,useEffect } from 'react';
import { fetchreviewer, getpdf,fetchauthorwork } from '../Services/ConferenceServices';
import axios from 'axios';


const ReviewPaper = () => {
  const [dateReviewed, setDateReviewed] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  
  const [reviewer, setReviewer] = useState('');
 // const [totalScore, setTotalScore] = useState(0);
  const [authorId, setAuthorId] = useState('');
  const [authorwork, setAuthorWork] = useState('');
  
//   if(window.location.search){
//     const urlParams = new URLSearchParams(window.location.search);
//     const reviewerId = urlParams.get('reviewerId');
//     console.log(reviewerId);
//     // Now you can use reviewerId to fetch reviewer-specific data and display it
// }
const [questionAnswers, setQuestionAnswers] = useState([
  { qus: '1.Based on your assessment rather than on author statements, what is the new contribution of this paper?', ans: '' },
  { qus: '2.Does the contribution have good archival value, or is it only an incremental to existing knowledge?', ans: '' }
]);

const [newQuestionText, setNewQuestionText] = useState('');

// Handler for adding a new question
const addNewQuestion = () => {
  // Create a new question object with an empty answer
  const newQuestion = { qus: newQuestionText, ans: '' };
  // Add the new question to the state
  setQuestionAnswers([...questionAnswers, newQuestion]);
  // Clear the new question input
  setNewQuestionText('');
};

// Handler for updating the answer of a question
const handleAnswerChange = (index, ans) => {
  // Create a copy of the questionAnswers array
  const updatedQuestionAnswers = [...questionAnswers];
  // Update the answer of the specified question
  updatedQuestionAnswers[index].ans = ans;
  // Update the state with the modified questionAnswers array
  setQuestionAnswers(updatedQuestionAnswers);
};

// Handler for deleting a question
const deleteQuestion = (index) => {
  // Remove the question at the specified index
  setQuestionAnswers(questionAnswers.filter((_, i) => i !== index));
};
// Function to handle submission of form data



useEffect(()=>{

  if(window.location.search){
    const urlParams = new URLSearchParams(window.location.search);
    const reviewerId = urlParams.get('reviewerId');
    setAuthorId(urlParams.get('authorWorkId'));
    const authorid=urlParams.get('authorWorkId');
    console.log(reviewerId);
    fetchreviewer(reviewerId).then((Response)=>{
      //console.log(Response);
      setReviewer(Response.data);
      
      }).catch((err)=>{
      console.log(err);
      })
      fetchauthorwork(authorid).then((Response)=>{
        setAuthorWork(Response.data);
    }).catch((err)=>{
       console.log(err);
    })
}

},[]);
// useEffect(()=>{
 
// },[]);
const fetchPdfOnClick = () => {
  getpdf(authorId)
    .then((url) => {
      setPdfUrl(url);
    })
    .catch((error) => {
      console.error('Error fetching PDF:', error);
    });
};
  useEffect(() => {
    // Function to get current date in YYYY-MM-DD format
    const getCurrentDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();

      // Ensure month and day are two digits
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }

      return `${year}-${month}-${day}`;
    };

    // Set the current date when the component mounts
    setDateReviewed(getCurrentDate());
  }, []);
  // const [grades, setGrades] = useState([Array(5).fill(null)]);
  //   // const [criteriaInputs, setCriteriaInputs] = useState(Array(10).fill(''));
  //   const [criteriaInputs, setCriteriaInputs] = useState(['']); // Initialize with one default input
  //   const [additionalInputs, setAdditionalInputs] = useState(['']);
  // State to store the selected recommendation
  const [selectedRecommendation, setSelectedRecommendation] = useState("");

  // Function to handle recommendation selection
  const handleRecommendationChange = (event) => {
    setSelectedRecommendation(event.target.value);
  };

    // Function to handle grade selection
    // const handleGradeSelection = (index, grade) => {
    //   const newGrades = [...grades];
    //   newGrades[index] = grade;
    //   setGrades(newGrades);
    // };
    // const addNewQuestion = () => {
    //   if (newQuestionText.trim() !== '') {
    //     // Adds the new question at the beginning of the list
    //     setCustomQuestions([{ id: customQuestions.length + 1, text: newQuestionText }, ...customQuestions]);
    //     setNewQuestionText(''); // Resets the input field
    //   }
    // };
  
    // const handleNewQuestionTextChange = (e) => {
    //   setNewQuestionText(e.target.value);
    // };
    // const handleAnswerChange = (index, answer) => {
    //   // Create a copy of the questionAnswers array
    //   const updatedQuestionAnswers = [...questionAnswers];
    //   // Update the answer of the specified question
    //   updatedQuestionAnswers[index].answer = answer;
    //   // Update the state with the modified questionAnswers array
    //   setQuestionAnswers(updatedQuestionAnswers);
    // };
  
   
  //---------------------------------------------------------
  const [criteriaData, setCriteriaData] = useState([]);

  const handleGradeSelection = (criteriaIndex, gradeIndex, grade) => {
    const newCriteriaData = [...criteriaData];
    if (!newCriteriaData[criteriaIndex]) {
      newCriteriaData[criteriaIndex] = { grades: Array(5).fill(null) };
    }
    newCriteriaData[criteriaIndex].grades = newCriteriaData[criteriaIndex].grades.map((g, idx) => (idx === gradeIndex ? grade : null));
    setCriteriaData(newCriteriaData);
  };
  
  const addCriteriaField = () => {
    setCriteriaData([...criteriaData, { grades: Array(5).fill(null) }]);
  };
  
  const removeCriteriaField = (index) => {
    setCriteriaData(criteriaData.filter((_, i) => i !== index));
  };
  
  const handleCriteriaInputChange = (index, value) => {
    const updatedCriteriaData = [...criteriaData];
    if (!updatedCriteriaData[index]) {
      updatedCriteriaData[index] = { grades: Array(5).fill(null) };
    }
    updatedCriteriaData[index].name = value;
    setCriteriaData(updatedCriteriaData);
  };
  
  const handleAdditionalInputChange = (index, value) => {
    const updatedCriteriaData = [...criteriaData];
    if (!updatedCriteriaData[index]) {
      updatedCriteriaData[index] = { grades: Array(5).fill(null) };
    }
    updatedCriteriaData[index].additional = value;
    setCriteriaData(updatedCriteriaData);
  };
  
  const calculateTotalScore = () => {
    const totalScore = criteriaData.reduce((acc, criteria) => {
      // Sum up all selected grades for each criterion
      return acc + (criteria.grades.find(grade => grade !== null) || 0);
    }, 0);
    return totalScore;
  };
  //   const handleFormSubmit=(e)=>{
  //     e.preventDefault();
  //     // const data = {
  //     //   // reviewerId: reviewer.reviewer_id, // Assuming `reviewer` is an object with a property `reviewer_id`
  //     //   // authorId: authorId,               // Assuming `authorId` is already defined
  //     //   // dateReviewed: dateReviewed,
  //     //   // recommendation: selectedRecommendation,     // Assuming `dateReviewed` is already defined
  //     //   // totalScore:calculateTotalScore()
  //     //   qus:newQuestionText
  //     // };
    
  //     // console.log(data);
  //     const allQuestionsAndAnswers = [
  //       { text: '1.Based on your assessment rather than on author statements, what is the new contribution of this paper?', answer: document.getElementById('contribution1').value },
  //       { text: '2.Does the contribution have good archival value, or is it only an incremental to existing knowledge?', answer: document.getElementById('contribution2').value },
  //       ...questionAnswers
  //     ];
  
  //     // Do something with the array of questions and answers
  //     console.log(allQuestionsAndAnswers);

  //   // Do something with the array of questions and answers
  //  // console.log(allQuestionsAndAnswers);
  //   }
  // const handleFormSubmit = (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior
  
  //   // Construct an array containing all questions and answers
  //   const allQuestionsAndAnswers = [
  //     { text: '1.Based on your assessment rather than on author statements, what is the new contribution of this paper?', answer: document.getElementById('contribution1').value },
  //     { text: '2.Does the contribution have good archival value, or is it only an incremental to existing knowledge?', answer: document.getElementById('contribution2').value },
  //     ...questionAnswers
  //   ];
  
  //   // Do something with the array of questions and answers
  //   console.log(allQuestionsAndAnswers);
  // };
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Construct an array containing all criteria inputs and their corresponding grades and additional inputs
   // Access all criteria data here in array form
  // const allCriteriaData = criteriaData.map(criteria => ({
  //   name: criteria.name,
  //   grade: criteria.grades.find(grade => grade !== null),
  //   additional: criteria.additional
  // }));
  // console.log(allCriteriaData); // You can do whatever you want with this array
  const data={
    reviewerId: reviewer.reviewer_id, // Assuming `reviewer` is an object with a property `reviewer_id`
    paperId: authorId,               // Assuming `authorId` is already defined
    reviewDate: dateReviewed,
    acceptance: selectedRecommendation,     // Assuming `dateReviewed` is already defined
          totalScore:calculateTotalScore()
  }
  const allCriteriaData = criteriaData.map(criteria => ({
    max_grade: criteria.name || '', // Use empty string if name is not set
    score: criteria.grades.find(grade => grade !== null) || 0, // Use 0 if grade is not set
    min_grade: criteria.additional || '', // Use empty string if additional is not set
  }));
  
  // const allQuestionsAndAnswers = [
  //   { qus: '1.Based on your assessment rather than on author statements, what is the new contribution of this paper?', ans: document.getElementById('contribution1').value },
  //   { qus: '2.Does the contribution have good archival value, or is it only an incremental to existing knowledge?', ans: document.getElementById('contribution2').value },
  //   ...questionAnswers
  // ];
  console.log(questionAnswers);
    const formData = new FormData();
    const y = JSON.stringify(data);
    const x = JSON.stringify(allCriteriaData);
     formData.append("name",x);
     formData.append("review",y);
     formData.append("coauthor",JSON.stringify(questionAnswers));
    axios.post(`http://localhost:9090/Reviewer/review`,formData).then((Response)=>{
      console.log(Response.data);
      alert(Response.data);

    }).catch((err)=>{
      console.log(err);
    })
  };
  return (
    <div className="container mt-5">
       <div className="mt-5">
        <button className="btn btn-primary" onClick={fetchPdfOnClick}>
          View PDF
        </button>
        {pdfUrl && (
          <div className="mt-3">
            <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
            <a href={pdfUrl} download="filename.pdf" className="btn btn-secondary mt-3">
              Download PDF
            </a>
          </div>
        )}
      </div>
      <div className="card">
        <div className="card-header bg-primary text-white">
          Paper Review Form
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}> 
          {/* <div className="mb-3">
          <label htmlFor="paperTitle" className="form-label">
    Track:
  </label>
  <select className="form-select" id="paperTitle">
    <option value="">Select Track</option>
    <option value="track1">Track 1</option>
    <option value="track2">Track 2</option>
    <option value="track3">Track 3</option>
   
  </select>
            </div> */}
            <div className="mb-3">
              <label htmlFor="paperTitle" className="form-label">
                Paper Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="paperNumber"
                value={authorwork.title}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="paperNumber" className="form-label">
                Paper Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="paperNumber"
                disabled
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="dateReviewed" className="form-label">
                Date Reviewed:
              </label>
              <input
               
                className="form-control"
                id="dateReviewed"
                value={dateReviewed}
              />
            </div>
            <div className="mb-3">
            {questionAnswers.map((question, index) => (
        <div key={index} className="mb-3">
          <label htmlFor={`customQuestionAnswer${index}`} className="form-label d-block mb-2">
            {question.qus}
          </label>
          <textarea
            className="form-control"
            id={`customQuestionAnswer${index}`}
            rows="3"
            placeholder="Enter your answer here..."
            value={question.ans}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          ></textarea>
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => deleteQuestion(index)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Add New Question Section */}
      <div className="mb-3 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          placeholder="Enter new question here..."
        />
        <button type="button" className="btn btn-secondary" onClick={addNewQuestion}>
          Add New Question
        </button>
      </div>
        </div>
            {/* More questions and input fields can be added similarly */}
            <div className="mb-3">
            <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          Paper Grading
        </div>
        <div className="card-body">
          {/* Iterate over each grading criteria */}
          {criteriaData.map((criteria, index) => (
        <div key={index} className="mb-4 row align-items-center">
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={`Criteria ${index + 1}`}
              value={criteria.name || ''}
              onChange={(e) => handleCriteriaInputChange(index, e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            {[5, 4, 3, 2, 1].map((grade, gradeIndex) => (
              <button
                key={grade}
                type="button"
                className={`btn btn-outline-secondary me-2 ${criteria.grades[gradeIndex] === grade ? 'active' : ''}`}
                onClick={() => handleGradeSelection(index, gradeIndex, grade)}
              >
                {grade}
              </button>
            ))}
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={`Additional Input ${index + 1}`}
              value={criteria.additional || ''}
              onChange={(e) => handleAdditionalInputChange(index, e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <button type="button" className="btn btn-danger" onClick={() => removeCriteriaField(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="text-end">
        <button type="button" className="btn btn-primary" onClick={addCriteriaField}>
          Add Criteria
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="totalScore" className="form-label">
          Total Score:
        </label>
        <input
          type="number"
          className="form-control"
          id="totalScore"
          disabled
          value={calculateTotalScore()}
        />
      </div>

          <div className="mb-3">
      <label className="form-label">Recommendation:</label>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="acceptWithoutChange"
          name="recommendation"
          value="accept With out Change"
          checked={selectedRecommendation === "acceptWithoutChange"}
          onChange={handleRecommendationChange}
        />
        <label className="form-check-label" htmlFor="acceptWithoutChange">
          <b>Accept without change –</b> The paper can be published in its current form.
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="acceptWithSuggestedChanges"
          name="recommendation"
          value="accept With Suggested Changes"
          checked={selectedRecommendation === "acceptWithSuggestedChanges"}
          onChange={handleRecommendationChange}
        />
        <label className="form-check-label" htmlFor="acceptWithSuggestedChanges">
          <b>Accept with suggested but not mandatory changes –</b> The paper can be published in its current form but could be made stronger by incorporating changes suggested by reviewers found on the following page.
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="acceptWithMandatoryChanges"
          name="recommendation"
          value="accept With Mandatory Changes"
          checked={selectedRecommendation === "acceptWithMandatoryChanges"}
          onChange={handleRecommendationChange}
        />
        <label className="form-check-label" htmlFor="acceptWithMandatoryChanges">
          <b>Accept with mandatory changes –</b> The paper cannot be published in its current form, but is provisionally accepted if the authors incorporate mandatory changes suggested by the reviewers. It is the opinion of this reviewer that the changes are relatively minor and can be incorporated in ten weeks or less. (Reviewer, please provide comments on the following page.)
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="doNotAccept"
          name="recommendation"
          value="do Not Accept"
          checked={selectedRecommendation === "doNotAccept"}
          onChange={handleRecommendationChange}
        />
        <label className="form-check-label" htmlFor="doNotAccept">
          <b>Do not accept –</b> The paper cannot be accepted in its current form. (Reviewer, please provide comments on the following page.)
        </label>
      </div>
    </div>
        </div>
      </div>
    </div>
            </div>
            
            <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          Reviewer's Information
        </div>
        <div className="card-body">
          {/* Render reviewer data if available */}
         
            <>
              <p>Reviewer's Name:{reviewer.name} </p>
              <p>Mobile No: {reviewer.mobile}</p>
              <p>Reviewer’s E-mail Address: {reviewer.email}</p>
              
            </>
       
        </div>
      </div>
    </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPaper;
