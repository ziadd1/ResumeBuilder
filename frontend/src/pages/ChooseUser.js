import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import './Login.css';
import './ChooseUser.css';

import { Link } from "react-router-dom";

const ChooseUser = () => {









    return (



        <>
        
        
        
        
        <div className="Choose">
    

        <h1>      Choose          </h1>

            <Link to="/login">
                <button className="Home-btn">User</button>
            </Link>
        
     
                <Link to="/loginRec">
                    <button className="Rec-btn">Recruiter</button>
                </Link>

                <Link to="/loginAdmin">
                    <button className="Rec-btn">Admin</button>
                </Link>



            </div>
            
            
            
            
            </>





    )






}




export default ChooseUser
