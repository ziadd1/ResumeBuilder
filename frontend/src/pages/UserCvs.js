import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import './Cvs.css';
import SideMenu from "../components/SideMenu";
import { useAuthContext } from '../hooks/useAuthContext'
const UserCvs = () => {

  // 3ayez a3mel hetet el config el mawgooda fe builder.js we fe preview bas lel recruiter
    const [cvs, setCvs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCvs, setFilteredCvs] = useState([]);
    const [query, setQuery] = useState("");


    
  const [loading, setLoading] = useState(true);
    const { user } = useAuthContext()





   
   
   

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId1 = userData ? userData.user_id : null;

        if (! (user)) {
            return
          }

        const config = {
            headers: {
              
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            
             
            }
          };
      
      axios.get(`http://localhost:4000/api/cv/searchResumesByID/${userId1}`,config)
        .then(response => {
          console.log(response.data.resumes);
          setCvs(response.data.resumes);
        })
        .catch(error => {
          console.error('Error fetching CVs:', error);
        });
    }, []);


    console.log("cvs:", cvs);

    // const handleSearch = async (event) => {
    //     setSearchQuery(event.target.value);
    //     try {
    //       const res = await axios.get(`http://localhost:4000/api/cv/searchResumes?query=${event.target.value}`);
    //       setCvs(res.data.resumes);
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   };

    const renderTableRows = () => {
        if (!Array.isArray(cvs)) {
            return (
              <tr>
                <td colSpan="9">{loading ? "Loading..." : "No CVs found."}</td>
              </tr>
            );
          }

        if (cvs.length === 0) {
            return (
              <tr>
                <td colSpan="9">{loading ? "Loading..." : "No CVs found."}</td>
              </tr>
            );
          }


          const handleDelete = async (id) => {
            try {
              const config = {
                headers: {
                  'Authorization': `Bearer ${user.token}`,
                  'Content-Type': 'application/json',
                }
              };
              await axios.delete(`http://localhost:4000/api/cv/deleteResume/${id}`, config);
              setCvs(cvs.filter((cv) => cv._id !== id));
            } catch (error) {
              console.error('Error deleting CV:', error);
            }
          }






        return cvs.map((cv, index) => {
          const backgroundColor = index % 2 === 0 ? "white" : "lightgray";
          return (
            <tr key={cv._id} style={{ backgroundColor }}>
              <td>{cv.Name}</td>
              <td>{cv.phone}</td>
              <td>{cv.email}</td>
              <td>{cv.references}</td>
              <td>{cv.EmploymentHistory}</td>
              <td>{cv.skills}</td>
              <td>{cv.profile}</td>
              <td>{cv.education}</td>
              <td>
                <Link to={`/Preview/${cv._id}`}> <button className="btn btn-primary">Preview</button></Link>
              </td>

              <td>
          <button className="btn btn-danger" onClick={() => handleDelete(cv._id)}>
            Delete
          </button>
        </td>


            </tr>
          );
        });
      };



    //   const handleSearchBar = (e) => {
    //     const newQuery = e.target.value;
    //     setQuery(newQuery);
    //     if (newQuery !== "") {
    //       const filtered = cvs.filter((cv) => {
    //         return (
    //           cv.Name.toLowerCase().includes(newQuery.toLowerCase()) ||
    //           cv.phone.toLowerCase().includes(newQuery.toLowerCase()) ||
    //           cv.email.toLowerCase().includes(newQuery.toLowerCase()) ||
    //           cv.references.toLowerCase().includes(newQuery.toLowerCase()) ||
    //           cv.EmploymentHistory.toLowerCase().includes(newQuery.toLowerCase()) ||
    //           cv.skills.toLowerCase().includes(newQuery.toLowerCase()) ||
    //           cv.profile.toLowerCase().includes(newQuery.toLowerCase()) ||
    //           cv.education.toLowerCase().includes(newQuery.toLowerCase())
    //         );
    //       });
    //       setFilteredCvs(filtered);
    //     } else {
    //       setFilteredCvs(cvs);
    //     }
    //   };
    return(


     
        // <><input type="text" placeholder="Search by keywords..." value={searchQuery} onChange={handleSearch} />
        
<>

        {/* <SideMenu cvs={cvs} setFilteredCvs={setFilteredCvs} /> */}
        <table class="table">

            <thead style={{ backgroundColor: "grey" }}>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>References</th>
                    <th>Employment History</th>
                    <th>Skills</th>
                    <th>Profile</th>
                    <th>Education</th>
                    <th>Preview Resume</th>

                </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
        </table></>
    



    );



};





export default UserCvs;
