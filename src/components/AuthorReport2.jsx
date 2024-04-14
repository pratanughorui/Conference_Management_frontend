import React from 'react';
import { useLoaderData } from 'react-router-dom';

function AuthorReport2() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-50"> {/* Adjust the column size here */}
          <div className="card">
            <div className="card-header bg-primary text-white">
              List Of All Papers
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Track name</th>
                    <th scope="col">Track ID</th>
                    <th scope="col">Similarity rating(0-100)</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {/* Populate table body content here */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorReport2;
