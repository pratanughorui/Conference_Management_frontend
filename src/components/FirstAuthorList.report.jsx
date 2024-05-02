import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchfirstsuthors } from '../Services/ConferenceServices';
function FirstAuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const conference_id = sessionStorage.getItem('con');
    if (!conference_id) {
      setError('Conference ID not found in session storage.');
      return;
    }

    // const fetchFirstAuthors = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const response = await axios.get(`${process.env.REST_API_BASE_URL}/report/getListOfFirsrAuthor/${conference_id}`);
    //     setAuthors(response.data);
    //     //console.log(response.data);
    //   } catch (err) {
    //     setError('Failed to fetch data: ' + err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchFirstAuthors();
    fetchfirstsuthors().then((response)=>{
      setAuthors(response.data);
     // console.log(response.data);
    }).catch((err)=>{
      setError('Failed to fetch data: ' + err.message);
    }).finally(()=>{
      
        setLoading(false);
      
    })
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12"> {/* Correct the column size */}
          <div className="card">
            <div className="card-header bg-primary text-white">
              List of First Authors
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                    <th scope="col">Affiliation</th>
                    <th scope="col">Country</th>
                    <th scope="col">Title</th>
                    <th scope="col">Track</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author, index) => (
                    <tr key={index}>
                      <td>{author.name}</td>
                      <td>{author.mobile}</td>
                      <td>{author.email}</td>
                      <td>{author.affiliation}</td>
                      <td>{author.country}</td>
                      <td>{author.paper_title}</td>
                      <td>{author.track_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstAuthorList;
