import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useAuthContext } from '../hooks/useAuthContext'

const userId = '6409f1c1571f02cb762f2373'; // Replace with your user id




const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
const userId1 = userData.user_id;


  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Resem<span className="home-highlight">U</span></h1>
        <p>Build your professional resume in minutes</p>
        <div className="home-buttons">
        <Link to={`/Builder/${userId1}`}>
          <button className="home-button">Create Resume</button>
        </Link>

        <Link to={`/UserCvs`}>
          <button className="Cvs-button">My Resumes</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
