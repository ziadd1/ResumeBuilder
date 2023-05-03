import {BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component }  from 'react';
import { useAuthContext } from './hooks/useAuthContext'

import { useAuthContextRec } from './hooks/useAuthContextRec'

import { useAuthContextAdmin } from './hooks/useAuthContextAdmin'
//pages and components

import Home from './pages/Home'
import Builder from "./pages/Builder";
 import Preview from "./pages/preview";
 import Pic from "./pages/Pic";
 import Cvs from "./pages/Cvs";
// import Pricing from "./pages/Pricing";
// import About from "./pages/About";
import Navbar from "./components/Navbar"; // import Navbar component
import SideMenu from "./components/SideMenu";

import Login from './pages/Login'
import Signup from './pages/Signup'
import LoginRec from './pages/LoginRec'
import ChooseUser from './pages/ChooseUser'
import UserCvs from './pages/UserCvs'
import LoginAdmin from './pages/LoginAdmin'
import CreateAdmin from './pages/CreateAdmin'
import CreateRecruiter from './pages/CreateRecruiter'
import AdminChoose from './pages/AdminChoose'

function App() {

  const { user } = useAuthContext()
  const { recruiter } = useAuthContextRec()
  const { admin } = useAuthContextAdmin()
  return (
    <div className="App">
     


     <BrowserRouter>

     <Navbar /> 
     <div className="pages">

<Routes>

<Route
path='/'
element={recruiter ? <Cvs /> : user ? <Home />  :  <Navigate to="/ChooseUser" />  } 
/>






<Route
path='/ChooseUser'
element={<ChooseUser />}
/>




<Route
path='/CreateAdmin'
element={ admin? <CreateAdmin /> :<ChooseUser /> }
/>


<Route
path='/CreateRecruiter'
element={admin ? <CreateRecruiter /> :<ChooseUser />  }
/>

<Route
path='/AdminChoose'
element={ admin? <AdminChoose /> :<ChooseUser /> }
/>





<Route
path='/UserCvs'
element={user? <UserCvs />: recruiter? <Cvs /> :  <Navigate to="/ChooseUser" /> }
/>



<Route
path='/Builder/:userId'
element={<Builder/>}
/>


<Route
path='/Preview/:id'
element={<Preview/>}
/>

<Route
path='/Pic/:id'
element={<Pic/>}
/>

<Route
path='/Cvs'
element={<Cvs/>}
/>
<Route
path='/SideMenu'
element={<SideMenu/>}
/>

<Route 
   path="/login" 
  element={ recruiter ? <ChooseUser /> :  admin ? <ChooseUser /> :!user ? <Login /> :<Navigate to="/" />} 
          />
<Route 
  path="/signup" 
  element={!user ? <Signup /> : <Navigate to="/" />} 
            />



<Route 
   path="/loginRec" 
  element={user ? <ChooseUser /> :  admin ? <ChooseUser />: !recruiter ? <LoginRec /> : <Navigate to="/Cvs" />} 
          />
//haghayar lesa el route
<Route 
   path="/LoginAdmin" 
  element={user ? <ChooseUser /> :  recruiter ? <ChooseUser />: !admin ? <LoginAdmin /> : <Navigate to="/AdminChoose" />} 
          />



</Routes>


      </div>
      
      
      </BrowserRouter>








    </div>
  );
}

export default App;
