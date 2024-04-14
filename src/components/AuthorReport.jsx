import React from 'react';
import { useLoaderData } from 'react-router-dom';

function AuthorReport() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-50"> {/* Adjust the column size here */}
          <div className="card">
            <div className="card-header bg-primary text-white">
              List Of papers By Authors
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Track name</th>
                    <th scope="col">First Author</th>
                    <th scope="col">First Author Email</th>
                    <th scope="col">First Author Country</th>
                    <th scope="col">Authors</th>
                    <th scope="col">Author IDs</th>
                    <th scope="col">Authors with affiliation and country</th>
                    <th scope="col">Copyright form, question or upload</th>
                    <th scope="col">Copy right form submitted</th>
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

export default AuthorReport;
