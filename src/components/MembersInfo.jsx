import React from 'react'
import { useLoaderData } from 'react-router-dom';

function MembersInfo() {
    const data = useLoaderData();
    const conference = data.data;
     console.log(conference);
    // const rev=[];
    // for(let i=0;i<conference.committees.length;i++){
     
    //         rev.push(conference.committees[i].user);
        
    // }
    
    // console.log(rev);
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
   
            {conference.map((con, index) => (
                                <tr key={index}>
                                    
                                    <td>{con.name}</td>
                                    <td>{con.email}</td>
                                    <td>{con.mobile}</td>
                                    
                                  
                                </tr>
                            ))}
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MembersInfo