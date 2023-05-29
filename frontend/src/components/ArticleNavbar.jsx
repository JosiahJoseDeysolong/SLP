import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/article-navbar.css';
import AuthContext from '../context/AuthContext';
import LoginModal from './Login';
import LogoutModal from './Logout';

const ArticleNavbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  let {user} =useContext(AuthContext)

  return (
    
    <nav className="navbar">
      <div className="top-section">
        <div className="logo">Logo</div>
        
        <input type="text" placeholder="Search" className="search-bar" />

        {user ? ( 

            <LogoutModal isOpen={modalOpen} closeModal={closeModal} />

          ):(

            <LoginModal isOpen={modalOpen} closeModal={closeModal} />
           

          )}


       </div>
      <div className="nav-buttons">


      {!user && (
        <>
          <Link to="/" className="nav-button">HOME</Link>
          <Link to="/projects" className="nav-button">PROJECTS</Link>
          <Link to="/articles" className="nav-button">ARTICLES</Link>
          <Link to="/gallery" className="nav-button">GALLERY</Link>
        </>
      )}
      
      {user && !user.is_superuser &&(
          <>
            <Link to="/super" className="nav-button">HOME</Link>
            <Link to="/super-projects" className="nav-button">PROJECTS</Link>
            <Link to="/super-articles" className="nav-button">ARTICLES</Link>
            <Link to="/super-registrar" className="nav-button">REGISTRAR</Link>
            <Link to="/super-gallery" className="nav-button">GALLERY</Link>
          </> 
      )}
      
      {user && user.is_superuser && (
          <>
            <Link to="/admin" className="nav-button">HOME</Link>
            <Link to="/admin-projects" className="nav-button">PROJECTS</Link>
            <Link to="/admin-articles" className="nav-button">ARTICLES</Link>
            <Link to="/admin-registrar" className="nav-button">REGISTRAR</Link>
            <Link to="/admin-gallery" className="nav-button">GALLERY</Link>
          </> 
      )}
  
      </div>
    </nav>
  );
};

export default ArticleNavbar;