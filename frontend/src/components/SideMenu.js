import React, { useState } from "react";
import axios from "axios";

const Sidebar = ({ handleSearchBar }) => {
  const [Name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [references, setReferences] = useState("");
  const [employmentHistory, setEmploymentHistory] = useState("");
  const [skills, setSkills] = useState("");
  const [profile, setProfile] = useState("");
  const [education, setEducation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = {
      Name,
      phone,
      email,
      references,
      employmentHistory,
      skills,
      profile,
      education,
    };
    handleSearchBar(query);
  };

  return (
    <div className="sidebar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          id="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="references">References</label>
        <input
          type="text"
          id="references"
          value={references}
          onChange={(e) => setReferences(e.target.value)}
        />

        <label htmlFor="employmentHistory">Employment History</label>
        <input
          type="text"
          id="employmentHistory"
          value={employmentHistory}
          onChange={(e) => setEmploymentHistory(e.target.value)}
        />

        <label htmlFor="skills">Skills</label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label htmlFor="profile">Profile</label>
        <input
          type="text"
          id="profile"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />

        <label htmlFor="education">Education</label>
        <input
          type="text"
          id="education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Sidebar;
