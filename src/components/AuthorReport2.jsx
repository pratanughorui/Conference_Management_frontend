import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function AuthorReport2() {
  const data = useLoaderData();
  const conference = data.data;
  // console.log(conference);
   const [tabledata,setTabledata]=useState([]);


//    if (conference) {
//     // Initialize an empty array to store the formatted data
//     const formattedData = [];

//     // Iterate through each track in the conference
//     conference.tracks.forEach(track => {
//         const trackId = track._id;
//         const trackName = track.track_name;
//           console.log("aaa");
//         // Iterate through each topic in the track
//         // track.topics.forEach(topic => {
//         //     // Iterate through each author work in the topic
//         //     topic.author_works.forEach(authorWork => {
//         //         // Extract required information and push it to the formattedData array
//         //         formattedData.push({
//         //             authorWorkId: authorWork._id,
//         //             title: authorWork.title,
//         //             trackId: trackId,
//         //             trackName: trackName
//         //         });
//         //     });
//         // });
//     });

//     // Set the formatted data to the state
//     console.log(formattedData);
//     setTabledata(formattedData);
// }
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
                  {conference.map((con, index) => (
                                <tr key={index}>
                                    <td>{con.paper_id}</td>
                                    <td>{con.paper_title}</td>
                                    <td>{con.track_id}</td>
                                    <td>{con.track_name}</td>
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

export default AuthorReport2;
