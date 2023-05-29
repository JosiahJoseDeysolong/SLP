import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import ReactModal from 'react-modal';
import './css/logout.css';

function Logout() {
  const { logoutUser } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button className="logout-button" onClick={() => setModalIsOpen(true)}>
        LOGOUT
      </button>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Logout Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="logout-heading">CONFIRM LOGOUT</h2>
        <form onSubmit={logoutUser}>

          <button className="logout-confirm" type="submit">
            CONFIRM
          </button>

          <button
            className="logout-cancel"
            onClick={() => setModalIsOpen(false)}
          >
            CANCEL
          </button>
        </form>
      </ReactModal>
    </div>
  );
}

export default Logout;
