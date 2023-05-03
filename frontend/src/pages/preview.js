import './preview.css';
import { Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { useAuthContext } from '../hooks/useAuthContext'
import { useAuthContextRec } from '../hooks/useAuthContextRec'
const Preview = () => {



  function formatSkills(skills) {
    let formattedSkills = skills.replace(/,\s*/g, '<br>'); // replace commas with <br> tags
    return formattedSkills;
  }

  function formatEdu(education) {
    let formattedEdu = education.replace(/,\s*/g, '<br>'); // replace commas with <br> tags
    return formattedEdu;
  }
  function formatProfile(profile) {
    let formattedProfile = profile.replace(/,\s*/g, '<br>'); // replace commas with <br> tags
    return formattedProfile;
  }
  function formatEmp(EmploymentHistory) {
    let formattedEmp = EmploymentHistory.replace(/,\s*/g, '<br>'); // replace commas with <br> tags
    return formattedEmp;
  }
  function formatReferences(references) {
    let formattedReferences = references.replace(/,\s*/g, '<br>'); // replace commas with <br> tags
    return formattedReferences;
  }

  // Retrieve the CV ID from the URL query parameter
  const { user } = useAuthContext()
  const { recruiter } = useAuthContextRec()
  const urlParams = new URLSearchParams(window.location.search);
  const CvId = window.location.href.split('/')[4]
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [profilePictureUrl, setprofilePictureUrl] = useState('');
  const [loading, setLoading] = useState(false); // add a loading state variable
  console.log(CvId);

  



    if (! (user || recruiter)) {
      return
    }
  

   

if (user){
    const config = {
      headers: {
        
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      
       
      }
    };
  
  
  
  axios.get(`http://localhost:4000/api/cv/getResumesByCvId/${CvId}`,config)
  .then(response => {
    // Fill in the preview with data
   
    console.log(response);
    document.getElementById('email').innerHTML = response.data[0].email;
    document.getElementById('Name').innerHTML = response.data[0].Name;
    document.getElementById('phone').innerHTML = response.data[0].phone;
   
   
    
    let skills = response.data[0].skills;// skills field from form data
      let formattedSkills = formatSkills(skills);
          document.getElementById('skills').innerHTML = formattedSkills; // display formatted skills


          let education = response.data[0].education;// education field from form data
          let formattedEdu = formatEdu(education);
              document.getElementById('education').innerHTML = formattedEdu; // display formatted education


              let profile = response.data[0].profile;// profile field from form data
              let formattedProfile = formatProfile(profile);
                  document.getElementById('profile').innerHTML = formattedProfile; // display formatted profile



                  let EmploymentHistory = response.data[0].EmploymentHistory;// Employment history field from form data
                  let formattedEmp = formatEmp(EmploymentHistory);
                      document.getElementById('EmploymentHistory').innerHTML = formattedEmp; // display formatted EMp


                      let references = response.data[0].references;// References field from form data
                      let formattedReferences = formatEmp(references);
                          document.getElementById('references').innerHTML = formattedReferences; // display formatted references
    



    
   
    

    setSelectedTemplate(response.data[0].template);

    setprofilePictureUrl(`../../../uploads/${response.data[0].profilePicture}`);

    setLoading(false); // set the loading state to false when the data has been fetched


    //we2eft hena   kamel enak tekhtar el template lel cv


  })
  .catch(error => {
    console.error(error);
    // Handle errors as needed
    setLoading(false); // set the loading state to false when the data has been fetched
  });
  


}

else 


if (recruiter){
  const config = {
    headers: {
      
      'Authorization': `Bearer ${recruiter.token}`,
      'Content-Type': 'application/json',
    
     
    }
  };



 

axios.get(`http://localhost:4000/api/cv/getResumesByCvId/${CvId}`,config)
.then(response => {
  // Fill in the preview with data
 
  console.log(response);
  document.getElementById('email').innerHTML = response.data[0].email;
  document.getElementById('Name').innerHTML = response.data[0].Name;
  document.getElementById('phone').innerHTML = response.data[0].phone;
  document.getElementById('education').innerHTML = response.data[0].education;
  document.getElementById('profile').innerHTML = response.data[0].profile;
  document.getElementById('EmploymentHistory').innerHTML = response.data[0].EmploymentHistory;
  let skills = response.data[0].skills;// skills field from form data
    let formattedSkills = formatSkills(skills);
        document.getElementById('skills').innerHTML = formattedSkills; // display formatted skills
  
  document.getElementById('references').innerHTML = response.data[0].references;
  

  setSelectedTemplate(response.data[0].template);

  setprofilePictureUrl(`../../../uploads/${response.data[0].profilePicture}`);


  //we2eft hena   kamel enak tekhtar el template lel cv


})
.catch(error => {
  console.error(error);
  // Handle errors as needed
});

};



function generatePDF() {

  // Get the CV template element by its ID
  const cvTemplate = document.getElementById('preview-wrapper');
  // Define the scale factor
  const scaleFactor = 1; // adjust this as needed

// Get the width and height of the CV template
const cvWidth = cvTemplate.offsetWidth;
const cvHeight = cvTemplate.offsetHeight;

const doc = new jsPDF({ unit: 'px', format: [cvWidth, cvHeight] });

  // Use html2canvas to capture a screenshot of the CV template
  html2canvas(cvTemplate,{ scale: scaleFactor }).then(canvas => {
   

    // Embed the CV template screenshot as an image in the PDF document
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    doc.addImage(imgData, 'JPEG', -280, 0, cvWidth, cvHeight);

    // Save the PDF file
    doc.save('cv-template.pdf');
  });
}




return(


 

  <div class = "page">
   <div id="preview-wrapper" dangerouslySetInnerHTML={{ __html: selectedTemplate === 'template1'
        ?`<div class="cv" template="template1">
        <Form>
      <head>
      
        <title>My CV</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
      </head><body>
        <div class="container">
        <div class = "row mt-3 text-center ">
          <h1>My CV</h1>
          </div>
          <div class="row mt-3">
          <div class="col-12 col-md-6 divider">
            <div class="section contact">
              <h2>Contact Details</h2>
              <ul>
                <li><strong>Name:</strong> <span id="Name" template="template1"></span></li>
                <li><strong>Email:</strong> <span id="email" template="template1"></span></li>
                <li><strong>Phone:</strong> <span id="phone" template="template1"></span></li>
              </ul>
            </div>


          <div class="section education">
         
          <hr class="my-3">
            <h2>Education</h2>
            <ul>
              <li> <span id="education" template="template1"></span></li>

            </ul>
          </div>

          <div class="section profile">
          <hr class="my-3">
            <h2>Profile</h2>
            <ul>
              <li> <span id="profile" template="template1"></span></li>
            </ul>
          </div>
          </div>

          <div class="col-12 col-md-6">
          <div class="section employment">
          
            <h2>Employment History</h2>
            <ul>
              <li> <span id="EmploymentHistory" template="template1"></span></li>

            </ul>
          </div>


          <div class="section skills">
            <h2>Skills</h2>
            <hr class="my-3">
            <ul>
              <li><span id="skills" template="template1"></span></li>

            </ul>
          </div>


          <div class="section references">
            <h2>References</h2>
            <hr class="my-3">
            <ul>
              <li><span id="references" template="template1"></span></li>

            </ul>
            </div>
          </div>
        </div>
        </div>
      </body>
      </Form>

    </div>`
    
    :  selectedTemplate === 'template2' ?
    
    `<div class="cv" template="template2">
    <Form>
  <head>
  
    <title>My CV</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
  </head><body>
    <div class="container">
    <div class = "row mt-3 text-center ">
      <h1>My CV</h1>
      </div>
      <div class="row mt-3">
      <div class="col-12 col-md-6 divider">
        <div class="section contact">
          <h2>Contact Details</h2>
          <ul>
            <li><strong>Name:</strong> <span id="Name" template="template2"></span></li>
            <li><strong>Email:</strong> <span id="email" template="template2"></span></li>
            <li><strong>Phone:</strong> <span id="phone" template="template2"></span></li>
          </ul>
        </div>


      <div class="section education">
     
      <hr class="my-3">
        <h2>Education</h2>
        <ul>
          <li> <span id="education" template="template2"></span></li>

        </ul>
      </div>

      <div class="section profile">
      <hr class="my-3">
        <h2>Profile</h2>
        <ul>
          <li> <span id="profile" template="template2"></span></li>
        </ul>
      </div>
      </div>

      <div class="col-12 col-md-6">
      <div class="section employment">
      
        <h2>Employment History</h2>
        <ul>
          <li> <span id="EmploymentHistory" template="template2"></span></li>

        </ul>
      </div>


      <div class="section skills">
        <h2>Skills</h2>
        <hr class="my-3">
        <ul>
          <li><span id="skills" template="template2"></span></li>

        </ul>
      </div>


      <div class="section references">
        <h2>References</h2>
        <hr class="my-3">
        <ul>
          <li><span id="references" template="template2"></span></li>

        </ul>
        </div>
      </div>
    </div>
    </div>
  </body>
  </Form>

</div>`


   :

   `<div class="cv" template="template3">
   <Form>
 <head>
 
   <title>My CV</title>
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <link rel="stylesheet" href="style.css" />
 </head><body>
   <div class="container">
   <div class = "row mt-3 text-center ">
     <h1>My CV</h1>
     </div>
     <div class="row mt-3">
     <div class="col-12 col-md-6 divider">
       <div class="section contact">
         <h2>Contact Details</h2>
         <ul>
           <li><strong>Name:</strong> <span id="Name" template="template3"></span></li>
           <li><strong>Email:</strong> <span id="email" template="template3"></span></li>
           <li><strong>Phone:</strong> <span id="phone" template="template3"></span></li>
         </ul>
       </div>


     <div class="section education">
    
     <hr class="my-3">
       <h2>Education</h2>
       <ul>
         <li> <span id="education" template="template3"></span></li>

       </ul>
     </div>

     <div class="section profile">
     <hr class="my-3">
       <h2>Profile</h2>
       <ul>
         <li> <span id="profile" template="template3"></span></li>
       </ul>
     </div>
     </div>

     <div class="col-12 col-md-6">
     <div class="section employment">
     
       <h2>Employment History</h2>
       <ul>
         <li> <span id="EmploymentHistory" template="template3"></span></li>

       </ul>
     </div>


     <div class="section skills">
       <h2>Skills</h2>
       <hr class="my-3">
       <ul>
         <li><span id="skills" template="template3"></span></li>

       </ul>
     </div>


     <div class="section references">
       <h2>References</h2>
       <hr class="my-3">
       <ul>
         <li><span id="references" template="template3"></span></li>

       </ul>
       </div>
     </div>
   </div>
   </div>
 </body>
 </Form>

</div>`
   


  }} />
    
    <button onClick={generatePDF}>Download as PDF</button>
   
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js">

    </script>
    



    
  </div>
    
    
    
    
    
    
   
)


}



export default Preview;