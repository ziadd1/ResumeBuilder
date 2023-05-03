import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import './Cvs.css';
import SideMenu from "../components/SideMenu";
const Cvs = () => {

  // 3ayez a3mel hetet el config el mawgooda fe builder.js we fe preview bas lel recruiter
    const [cvs, setCvs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCvs, setFilteredCvs] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
      
      axios.get("http://localhost:4000/api/recruiter/getCvs")
        .then(response => {
          console.log(response.data);
          setCvs(response.data);
        })
        .catch(error => {
          console.error('Error fetching CVs:', error);
        });
    }, []);




    const handleSearch = async (event) => {
        setSearchQuery(event.target.value);
        try {
          const res = await axios.get(`http://localhost:4000/api/recruiter/searchResumes?query=${event.target.value}`);
          setCvs(res.data.resumes);
        } catch (err) {
          console.error(err.message);
        }
      };

    const renderTableRows = () => {
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
            </tr>
          );
        });
      };



      const handleSearchBar = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery !== "") {
          const filtered = cvs.filter((cv) => {
            return (
              cv.Name.toLowerCase().includes(newQuery.toLowerCase()) ||
              cv.phone.toLowerCase().includes(newQuery.toLowerCase()) ||
              cv.email.toLowerCase().includes(newQuery.toLowerCase()) ||
              cv.references.toLowerCase().includes(newQuery.toLowerCase()) ||
              cv.EmploymentHistory.toLowerCase().includes(newQuery.toLowerCase()) ||
              cv.skills.toLowerCase().includes(newQuery.toLowerCase()) ||
              cv.profile.toLowerCase().includes(newQuery.toLowerCase()) ||
              cv.education.toLowerCase().includes(newQuery.toLowerCase())
            );
          });
          setFilteredCvs(filtered);
        } else {
          setFilteredCvs(cvs);
        }
      };
    return(


     
        <><input type="text" placeholder="Search by keywords..." value={searchQuery} onChange={handleSearch} />
        


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





export default Cvs;
