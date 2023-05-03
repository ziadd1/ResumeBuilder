import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import './Login.css';
import './ChooseUser.css';

import { Link } from "react-router-dom";

const AdminChoose = () => {



    return (



        <>
        
        
        
        
        <div className="Choose">
    

       

            <Link to="/CreateAdmin">
                <button className="Home-btn">Create New Admin</button>
            </Link>
        
     
                <Link to="/CreateRecruiter">
                    <button className="Rec-btn">Create Recruiter</button>
                </Link>

                



            </div>
            
            
            
            
            </>





    )






}




export default AdminChoose
