
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import './Builder.css';
import { useAuthContext } from '../hooks/useAuthContext'

const Builder = () => {
  const { user } = useAuthContext()

    const params = new URLSearchParams(window.location.search);
   
    const { userId } = useParams();
    
    const [template, setTemplate] = useState('');
    const [error, setError] = useState(null)
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [references, setReferences] = useState('');
    const [profile, setProfile] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [EmploymentHistory, setEmploymentHistory] = useState('');
   
    const [profilePicture, setSelectedFile] = useState(null);
    const CV = {
      Name : "ziad",
      email:"ziadtt5@gmail.com",
      phone:"0120939393939",
      references:"wwwwww",
      profile:"wwwww",
      skills:"wwwwww",
      education:"aaaaaaaa",
      experience:"ddddddddd",
      EmploymentHistory:"ssssss",
      template:"template1",
      profilePicture:""
    }
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCvData({ ...cvData, [name]: value });
//   };






function generatePreview(CV) {
  // Get a reference to the preview container
  const preview = document.getElementById("preview");

  // Get the selected template from the CV object
  const selectedTemplate = CV.template;

  // Clear the preview container
  preview.innerHTML = "";

  // Generate the preview based on the selected template
  switch (selectedTemplate) {
    case "template1":
      // Generate preview using Template 1
      const namePreview = document.createElement("div");
      namePreview.classList.add("name-preview");
      namePreview.textContent = CV.Name;
      preview.appendChild(namePreview);

      const emailPreview = document.createElement("div");
      emailPreview.classList.add("email-preview");
      emailPreview.textContent = CV.email;
      preview.appendChild(emailPreview);

      const phonePreview = document.createElement("div");
      phonePreview.classList.add("phone-preview");
      phonePreview.textContent = CV.phone;
      preview.appendChild(phonePreview);

      const referencesPreview = document.createElement("div");
      referencesPreview.classList.add("references-preview");
      referencesPreview.textContent = CV.references;
      preview.appendChild(referencesPreview);

      const profilePreview = document.createElement("div");
      profilePreview.classList.add("profile-preview");
      profilePreview.textContent = CV.profile;
      preview.appendChild(profilePreview);

       const skillsPreview = document.createElement("div");
       skillsPreview.classList.add("skills-preview");
       skillsPreview.textContent = CV.skills;
      preview.appendChild(skillsPreview);

      const EmploymentHistoryPreview = document.createElement("div");
      EmploymentHistoryPreview.classList.add("EmploymentHistory-preview");
      EmploymentHistoryPreview.textContent = CV.EmploymentHistory;
      preview.appendChild(EmploymentHistoryPreview);

      const educationPreview = document.createElement("div");
      educationPreview.classList.add("education-preview");
      educationPreview.textContent = CV.education;
      preview.appendChild(educationPreview);
      break;
    case "template2":
      // Generate preview using Template 2

      break;
    case "template3":
      // Generate preview using Template 3

      break;
    default:
      console.error("Invalid template selected");
      break;
  }
}




  



  //  function selectTemplate(selectedTemplate) {
  //    for (let i = 0; i < templates.length; i++) {
  //      templates[i].classList.remove('selected');
  //    }
  //    selectedTemplate.classList.add('selected');
  //  }
   


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
}


  const handleFormSubmit = async (event) => {
    if (!user) {
      setError('You must be logged in')
      return
    }

//     const selectedTemplate = event.target.dataset.template;

// // Set the selected template in the CV data
// CV.template = selectedTemplate;

   
    event.preventDefault();
   

  // // Redirect the user to the CV preview page
  // window.location.href = 'preview.js';
  
    const data = {
      Name,
      email,
      phone,
      references,
      profile,
      skills,
      education,
      experience,
      EmploymentHistory,
      template,
      profilePicture
    }
    // lma agy a3mel el auth bta3 el recruiter  momken agarab if(user yb2a da bas law rec yb2a config tany)
    const config = {
      headers: {
        
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      
       
      }
    };
  
    // fe error bsabab eno Unauthorized
   const response = await axios.post(`http://localhost:4000/api/cv/createCv/:userId=${userId}`, data,config)
      .then(async (res) => {
        
        console.log('CV created successfully');
        console.log(res);
        const data = res.data; // extract the response data
        const CvId = data._id; // extract the "_id" property


        window.location.href = `http://localhost:3000/Pic/${CvId}`;
        // Handle successful response here
      })
    
      .catch((err) => {
        console.error(err.message);
        // Handle error response here
      });


    
     

      

      };
      
//     event.preventDefault();
//     const response = await axios.post("http://localhost:4000/api/cv/CreateCv", cvData);
//     console.log(response.data); // Log the response data
//   };


function generatePreviewHTML(CV, template) {
  // Get the CV data
  const name = CV.Name;
  const email = CV.email;
  const education = CV.education;
  const EmploymentHistory = CV.EmploymentHistory;
  const phone = CV.phone;
  const references = CV.references;
  const skills = CV.skills;
  const profile = CV.profile;
  // Use the template parameter to determine which template to use
  switch (template) {
    case 'template1':
      // Generate HTML for template 1
      var previewHTML = `
        <div class="template1">
          <h1>${name}</h1>
          <h2>${email}</h2>
          <h2>${phone}</h2>
          <p>${profile}</p>
          <p>${education}</p>
          <p>${EmploymentHistory}</p>
          <p>${skills}</p>
          <p>${references}</p>
          // <h2>Experience</h2>
          // ${experience.map((item) => `
          //   <div class="experience-item">
          //     <h3 class="template1-title">${item.title}</h3>
          //     <p>${item.startDate} - ${item.endDate}</p>
          //     <ul>
          //       ${item.description.map((descriptionItem) => `
          //         <li>${descriptionItem}</li>
          //       `).join('')}
          //     </ul>
          //   </div>
          // `).join('')}
        </div>
      `;
      break;
    case 'template2':
      // Generate HTML for template 2
      var previewHTML = `
        <div class="template2">
        <h1>${name}</h1>
        <h2>${email}</h2>
        <h2>${phone}</h2>
        <p>${profile}</p>
        <p>${education}</p>
        <p>${EmploymentHistory}</p>
        <p>${skills}</p>
        <p>${references}</p>
        </div>
      `;
      break;
    default:
      // Default template
      var previewHTML = `
        <div class="default-template">
         <h1>${name}</h1>
          <h2>${email}</h2>
          <h2>${phone}</h2>
          <p>${profile}</p>
          <p>${education}</p>
          <p>${EmploymentHistory}</p>
          <p>${skills}</p>
          <p>${references}</p>
        </div>
      `;
  }

  return previewHTML;
}


// // Encode the form data as a JSON string and store it in sessionStorage or localStorage
// const encodedData = JSON.stringify(CV);

// // Store the encoded data in sessionStorage
// localStorage.setItem('cvData', encodedData);

  return (



    
    <div className="builder-container">
      <h1>Build your Resume</h1>
      <form id="cvForm" onSubmit={handleFormSubmit}>
      <div className="input-group">
  <label htmlFor="name">Name</label>
  <input type="text" id="name" value={Name} onChange={(e) => setName(e.target.value)} />
  </div>

  <div className="input-group">
  <label htmlFor="email">Email</label>
  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
  </div>

  <div className="input-group">
  <label htmlFor="phone">Phone</label>
  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
  </div>

  <div className="input-group">
  <label htmlFor="references">References</label>
  <textarea id="references" value={references} onChange={(e) => setReferences(e.target.value)}></textarea>
  </div>

  <div className="input-group">
  <label htmlFor="EmploymentHistory">EmploymentHistory</label>
  <textarea id="EmploymentHistory" value={EmploymentHistory} onChange={(e) => setEmploymentHistory(e.target.value)}></textarea>
  </div>

  <div className="input-group">
  <label htmlFor="Skills">Skills</label>
  <textarea id="Skills" value={skills} onChange={(e) => setSkills(e.target.value)}></textarea>
  </div>

  <div className="input-group">
  <label htmlFor="profile">Profile</label>
  <textarea id="profile" value={profile} onChange={(e) => setProfile(e.target.value)}></textarea>
  </div>

  <div className="input-group">
  <label htmlFor="education">Education</label>
  <textarea id="education" value={education} onChange={(e) => setEducation(e.target.value)}></textarea>
  </div>

  {/* <div id="template-selection">
     <h2>Select a Template</h2>
     <div id="templates"   >
      
       <img src="../../../images/iStock-1160804712-1320x880.jpg" alt= "Template 1"data-template="1"></img>
       <img src="../../../images/template1.png" alt= "Template 2" data-template="2"></img>
       <img src="../../../images/template1.png" alt= "Template 2" data-template="3"></img>
     </div>
   </div> */}
   <div id= "template-selection">
   <h2>Select a Template</h2>
       <label>
      <input type="radio" name="template" value="template1"  onChange={(event) => setTemplate(event.target.value)} />
      White template
    </label>
    <label>
      <input type="radio" name="template" value="template2" onChange={(event) => setTemplate(event.target.value)} />
      light Blue template
    </label>
    <label>
      <input type="radio" name="template" value="template3"  onChange={(event) => setTemplate(event.target.value)} />
      Orange Template
    </label>
 </div>




 {/* <label htmlFor="profilePicture">Profile Picture</label>
    <input 
      type="file" 
      className="form-control-file" 
      id="profilePicture" 
      name="profilePicture" 
      accept="image/*" 
      onChange={handleFileChange}
    /> */}




  <button  type="submit">Next</button>

</form>
    
{/* <div class="cv-preview">
  <div class="cv-header">
    <h1 class="cv-name">{{Name}}</h1>
    <h2 class="cv-email">{{email}}</h2>
    <h2 class="cv-phone">{{phone}}</h2>
   
    <p class="cv-profile">{{profile}}</p>
    <p class="cv-education">{{education}}</p>
    <p class="cv-EmploymentHistory">{{EmploymentHistory}}</p>
    <p class="cv-skills">{{skills}}</p>
   
    <p class="cv-references">{{references}}</p>
  </div> */}
  
  {/* <div class="cv-experience">
    <h2>Experience</h2>
    {{#each experience}}
      <div class="cv-experience-item">
        <h3 class="cv-experience-title">{{title}}</h3>
        <p class="cv-experience-dates">{{startDate}} - {{endDate}}</p>
        <ul class="cv-experience-description">
        {{#each description}}
          <li>{{this}}</li>
        {{/each}}
        </ul>
      </div>
    {{/each}} */}
 
{/* </div> */}



    </div>
    
  );
};

export default Builder;
