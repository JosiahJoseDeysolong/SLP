import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import './css/login.css'
function Login() {
  let {loginUser} = useContext(AuthContext)
  let {user} = useContext(AuthContext)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    
    <div>
        <button className="login-button" onClick={() => setModalIsOpen(true)}>SIGN IN</button>
        <ReactModal 
          isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Login Modal"
          className="modal"
          overlayClassName="modal-overlay">

        <h2 className="login-heading">LOGIN</h2>
          <form onSubmit={loginUser} >
            <h2 className="input-heading">Username</h2>
              <input className="input-field" type="text" name="username" placeholder="Enter Username" />
            <h2 className="input-heading">Password</h2>
              <input className="input-field" type="password" name="password" placeholder="Enter Password" />
              <button className="login-submit" type="submit" >LOGIN</button>
          </form>
        </ReactModal>
    </div>

  );
}

export default Login;
