import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchpaperstatus } from '../Services/ConferenceServices';
function PaperStatusLastDate() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const conference_id = sessionStorage.getItem('con');
        if (!conference_id) {
            setError('Conference ID not found in session storage.');
            return;
        }

       
        // fetchAuthors();
        fetchpaperstatus().then((response)=>{
            setAuthors(response.data);
           // console.log(response.data);
          }).catch((err)=>{
            setError('Failed to fetch data: ' + err.message);
          }).finally(()=>{
            
              setLoading(false);
            
          })
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-12"> {/* Correct the column size */}
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                        List of Papers with Status and Last date of Upload
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Track</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">First Author</th>
                                        <th scope="col">Co- Authors.</th>
                                        <th scope="col">Keywords</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Last date of Upload</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {authors.map((author, index) => (
                                        <tr key={index}>
                                            <td>{author.track_name}</td>
                                            <td>{author.paper_title}</td>
                                            <td>{author.name}</td>
                                            <td>{author.co_authors}</td>
                                            <td>{author.keywords}</td>
                                            <td>{author.status}</td>
                                            <td>{author.ldou}</td>
                                            
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

export default PaperStatusLastDate;
