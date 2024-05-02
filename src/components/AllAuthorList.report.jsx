import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchallauthors } from '../Services/ConferenceServices';

function AllAuthorList() {
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
        fetchallauthors().then((response)=>{
            setAuthors(response.data);
            console.log(response.data);
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
                            List of All Authors
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">First Author Name</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Affiliation</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Author/Co-Author</th>
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
                                            <td>{author.co_authors}</td>
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

export default AllAuthorList;
