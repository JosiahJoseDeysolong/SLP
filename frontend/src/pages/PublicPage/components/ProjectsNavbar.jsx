import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css'

const ProjectsNavbar = () => {

  return (
    
    <nav className="projects-navbar">
      <div className="nav-buttons">
        <Link to="/projects/about" className="projects-nav-button">
          ABOUT
        </Link>
        <Link to="/projects/partner" className="projects-nav-button">
          PARTNER
        </Link>
        <Link to="/projects/faculty" className="projects-nav-button">
          FACULTY
        </Link>
        <Link to="/articles" className="projects-nav-button">
          ARTICLES
        </Link>
        <Link to="/gallery" className="projects-nav-button">
          GALLERY
        </Link>
      </div>
    </nav>
  );
};

export default ProjectsNavbar;
