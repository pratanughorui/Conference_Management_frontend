import React from 'react';
import { useLoaderData } from 'react-router-dom';
const ReviewerInformationTable = ({ reviewers }) => {
    const data = useLoaderData();
    const conference = data.data;
      //console.log(conference);
    // const rev=[];
    // for(let i=0;i<conference.tracks.length;i++){
     
    //         rev.push(conference.tracks[i].reviewers);
        
    // }
    
    // console.log(rev);
    
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          Reviewers Information:
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
              <th scope="col">Track</th>
                <th scope="col">Name</th>
                <th scope="col">Affliation</th>
                <th scope="col">Country</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
              </tr>
            </thead>
            <tbody>
   
            {conference.map((rev, index) => (
                                        <tr key={index}>
                                            <td>{rev.track_name}</td>
                                            <td>{rev.name}</td>
                                            <td>{rev.affiliation}</td>
                                            <td>{rev.country}</td>
                                            <td>{rev.email}</td>
                                            <td>{rev.mobile}</td>
                                           
                                            
                                        </tr>
                                    ))}
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewerInformationTable;
