import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
 
const NavbarProjectPage = () => {

 //    <Link to="/admin-projects-partner" className="nav-button">PARTNER</Link>
//     <Link to="/admin-projects-beneficiary" className="nav-button">BENEFICIARY</Link>
//     <Link to="/admin-projects-coordinator" className="nav-button">COORDINATOR</Link>


  return (
    
<nav className="navbar">
  <div className="nav-row">
    <Link to="/admin-projects" className="nav-button">PROJECTS</Link>
    <Link to="/admin-projects-dean" className="nav-button">DEAN</Link>
    <Link to="/admin-projects-faculty" className="nav-button">FACULTY</Link>
    <Link to="/admin-projects-student" className="nav-button">STUDENT</Link>
    <Link to="/admin-projects-partner" className="nav-button">PARTNER</Link>

  </div>
</nav>
  );
};

export default NavbarProjectPage;