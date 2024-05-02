import React, { useState,useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { fetchpapersenttocopyright } from '../Services/ConferenceServices';
function PaperSentCopyRight() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const conference_id = sessionStorage.getItem('con');
      if (!conference_id) {
        setError('Conference ID not found in session storage.');
        return;
      }
      fetchpapersenttocopyright().then((response)=>{
        setAuthors(response.data);
        //console.log(response.data);
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
        <div className="col-lg-50"> {/* Adjust the column size here */}
          <div className="card">
            <div className="card-header bg-primary text-white">
            List of Papers Sent for Copy right
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">First Author</th>
                    <th scope="col">Co-Author</th>
                    <th scope="col">Last date of Upload</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Populate table body content here */}
                  {authors.map((con, index) => (
                                <tr key={index}>
                                    <td>{con.paper_title}</td>
                                    <td>{con.name}</td>
                                    <td>{con.co_authors}</td>
                                  
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

export default  PaperSentCopyRight;
