import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // import CSS file
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogoutRec } from '../hooks/useLogoutRec'
import { useLogoutAdmin } from '../hooks/useLogoutAdmin'
import { useAuthContextRec } from '../hooks/useAuthContextRec'
import { useAuthContextAdmin } from '../hooks/useAuthContextAdmin'

function Navbar() {

  const { logout } = useLogout()
  const { logoutRec } = useLogoutRec()
  const { logoutAdmin } = useLogoutAdmin()

  const { user } = useAuthContext()
  const { recruiter } = useAuthContextRec()
  const { admin } = useAuthContextAdmin()

  const handleClick = () => {
    logout()
  }

  const handleClick2 = () => {
    logoutRec()
  }

  const handleClick3 = () => {
    logoutAdmin()
  }


  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Resem<span className="navbar-logo-highlight">U</span>
      </Link>
      <ul className="navbar-links">


      {user && (
      <>
      {/* <div>
          
          <Link to={`/Builder/${user._id}`}>Builder</Link>
        </div> */}
        <div className="email"><span>{user.email}</span> </div>
        <div className="logOut">
        <Link to="/ChooseUser">
            <button className="logout-btn" onClick={handleClick}>Log out</button>
            </Link>
          </div></>
      )}

{recruiter && (
      <>
      {/* <div>
          
          <Link to={`/Builder/${user._id}`}>Builder</Link>
        </div> */}
        <div className="email"><span>{recruiter.email}</span> </div>
        <div className="logOut">
        <Link to="/ChooseUser">
            <button className="logout-btn" onClick={handleClick2}>Log out</button>
            </Link>
          </div></>
      )}
{admin && (
      <>
      {/* <div>
          
          <Link to={`/Builder/${user._id}`}>Builder</Link>
        </div> */}
        <div className="email"><span>{admin.email}</span> </div>
        <div className="logOut">
        <Link to="/ChooseUser">
            <button className="logout-btn" onClick={handleClick3}>Log out</button>
            </Link>
          </div></>
      )}



          {!user && !recruiter && !admin && (
        <div >
            <Link to="/ChooseUser" className="login">Login</Link>
            <Link to="/signup"  className="Signup">Signup</Link>
          </div>
          )}






      </ul>
    </nav>
    


    
  );
}

export default Navbar;
