import React, { useState, useEffect } from 'react';
import { fetchcommitteemembers } from '../Services/ConferenceServices';

function CommitteeMembersList() {
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [committeeData, setCommitteeData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchcommitteemembers()
            .then(response => {
                setCommitteeData(response.data);
            })
            .catch(error => {
                setError('Failed to fetch data: ' + error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const committeeNames = Object.keys(committeeData);

    const committeeMembers = selectedCommittee ? committeeData[selectedCommittee] : [];

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <span>List of Committee members</span>
                            <div>
                                <label htmlFor="committeeSelect" className="me-2">Committee:</label>
                                <select id="committeeSelect" value={selectedCommittee} onChange={handleCommitteeChange}>
                                    <option value="">Select Committee</option>
                                    {committeeNames.map((committeeName, index) => (
                                        <option key={index} value={committeeName}>{committeeName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Country</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {committeeMembers.map((member, index) => (
                                        <tr key={index}>
                                            <td>{member.designation}</td>
                                            <td>{member.name}</td>
                                            <td>{member.mobile}</td>
                                            <td>{member.email}</td>
                                            <td>{member.country}</td>
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

export default CommitteeMembersList;
