import React from 'react'
import { useLoaderData } from 'react-router-dom';

function MembersInfo() {
    const data = useLoaderData();
    const conference = data.data;
    console.log(conference);
    const rev=[];
    for(let i=0;i<conference.committees.length;i++){
     
            rev.push(conference.committees[i].user);
        
    }
    
    console.log(rev);
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          Members Information
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
              </tr>
            </thead>
            <tbody>
   
            {rev.map((reviewersArray, index) => (
                // Nested mapping to iterate over each reviewer in the reviewersArray
                reviewersArray.map((reviewer, subIndex) => (
                  <tr key={`${index}-${subIndex}`}>
                    {/* Access individual properties of each reviewer */}
                    <td>{reviewer.name}</td>
                    <td>{reviewer.email}</td>
                    <td>{reviewer.mobile}</td>
                  </tr>
                ))
              ))}
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MembersInfo