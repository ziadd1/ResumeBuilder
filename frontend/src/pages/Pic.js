import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
// import './Pic.css';
const Pic = () => {

  
    const urlParams = new URLSearchParams(window.location.search);
    const CvId = window.location.href.split('/')[4]

    const [profilePictureUrl, setprofilePictureUrl] = useState('');
    console.log(CvId);
    document.addEventListener('DOMContentLoaded', () => {

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('profilePicture', document.getElementById('profilePicture').files[0]);
        const response = await fetch(`http://localhost:4000/api/cv/uploadImage/${CvId}`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        console.log(data);

        window.location.href = `http://localhost:3000/Preview/${CvId}`;
        // Handle response and UI changes
      }

       
  document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    handleFileUpload(); // handle file upload
  });
});
      
    //   // Attach event listener to file input
    //   fileInput.addEventListener('change', (event) => {
    //     selectedFile = event.target.files[0];
    //   });
      
      // Attach event listener to upload button
    //   uploadButton.addEventListener('click', () => {
    //     handleFileUpload();
    //   });





return(

    <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center">Upload Profile Picture</h1>
          </div>
          <div class="card-body">
            <form id="upload-form" method="POST" enctype="multipart/form-data">
              <div class="form-group">
                <label for="profilePicture">Select a picture:</label>
                <input type="file" class="form-control-file" id="profilePicture"/>
              </div>
              <div class="mt-4 text-center">
                <button type="submit"  class="btn btn-primary">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

   

)
}
export default Pic;