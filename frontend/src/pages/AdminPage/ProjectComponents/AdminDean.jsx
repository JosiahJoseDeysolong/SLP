import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarProjectPage from "./components/NavbarProjectPage";
import './components/css/projectsnav.css';
import { BASE_URL } from '../../../apiConfig'

const AddDeanModal = ({ onClose, onSubmit }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [error, setError] = useState('');

  const handleFirstChange = (e) => {
    setFirstName(e.target.value);
    setError('');
  };

  const handleLastChange = (e) => {
    setLastName(e.target.value);
    setError('');
  };

  const handleMiddleChange = (e) => {
    setMiddleName(e.target.value);
    setError('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setError('First Name is required');
      return;
    }

    if (!lastName.trim()) {
      setError('Last Name is required');
      return;
    }

    if (!middleName.trim()) {
      setError('Middle Name is required');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/private/dean-create/`, {
        dean_first_name: `${firstName}`,
        dean_last_name: `${lastName}`,
        dean_middle_name: `${middleName}`,        
      });

      if (response.status === 200) {
        onSubmit();
      } else {
        setError('Something went Wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went Wrong');
    }



  }; 


  return (
    <div className="p-modal">
  <div className="p-modal-content">
   
    <div>
      <h2 className="p-h2">Add Dean</h2>
    </div>
    <form onSubmit={handleSubmit} className="p-form-container">
      <label className="p-input-label">First Name:</label>
      <input
         
        name="firstName"
        value={firstName}
        onChange={handleFirstChange}
        className="p-input-field"
        placeholder="Enter the first name"
        required
      />

      <label className="p-input-label">Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={lastName}
        onChange={handleLastChange}
        className="p-input-field"
        placeholder="Enter the last name"
        required
      />

      <label className="p-input-label">Middle Name:</label>
      <input
        type="text"
        name="middleName"
        value={middleName}
        onChange={handleMiddleChange}
        className="p-input-field"
        placeholder="Enter the middle name"
        required
      />

      {error && <div className="p-error-message">{error}</div>}

      <div className="p-button-container">
        <button type="submit" className="p-button">
          Submit
        </button>
        <button type="button" className="p-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

  );

};

const AdminDean = () => {
  const [listDean, setListDean] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchB, setSearchB] = useState('');
  const [searchDean, setSearchDean] = useState([]);

   const [deletedDeans, setDeletedDeans] = useState([]);

  const navigate = useNavigate();

  const deleter = async (idDe) => {
    try {
      const response = await axios.delete(`${BASE_URL}/private/dean-delete/${idDe}`);
      const data = response.data;
      if (response.status === 200) {
        const deletedDean = listDean.find(dean => dean.idDe === idDe);
        setDeletedDeans([...deletedDeans, deletedDean]);
        setListDean(listDean.filter(dean => dean.idDe !== idDe));
      } else {
        alert('Error Deleting.');
      }
    } catch (error) {
      alert('Error Deleting.');
    }
  };

  const adder = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/dean-list/`);
      const data = response.data;
      if (response.status === 200) {
        const sortedDeans = data.sort((a, b) => a.dean_last_name.localeCompare(b.dean_last_name));
        setListDean(sortedDeans);
        
      } else {
        alert('Error fetching deans.');
      }
    } catch (error) {
      alert('Error fetching deans.');
    }
  };
  

  const searcher = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/query/search-dean/?q=${query}`);
      if (response.status === 200) {
        const sortedDeans = response.data.sort((a, b) => a.dean_last_name.localeCompare(b.dean_last_name));
        setSearchDean(sortedDeans);
      } else {
        alert('Error fetching deans.');
      }
    } catch (error) {
      alert('Error fetching deans.');
    }
  };

  useEffect(() => {
    adder();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeanSubmit = () => {
    closeModal();
    adder();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchB(query);
    searcher(query);
  };

  return (
    <div className="adpy-page-container">
      
      <NavbarProjectPage />
      <div className="adpy-page-container">
        <h1 className="ap-header-text">DEAN DIRECTORY</h1>
        <hr className="ap-header-underline" />
        <div className="f-students-container">
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchB}
          onChange={handleSearchChange}
        />
        </div>
        <div className="p-students-container">
        <button className = "p-button"  onClick={openModal}>Add Dean</button>
      
        </div>
      <div className="p-students-container">
        <ul className="p-h3">


                {searchB.trim() !== '' ? (
          searchDean.map((dean) => (
            <li key={dean.idDe} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                {dean.dean_last_name}, {dean.dean_first_name} {dean.dean_middle_name}
              </span>
              <button className="p-button" onClick={() => deleter(dean.idDe)}>Delete</button>
            </li>
          ))
        ) : (
          listDean !== null &&
          listDean.map((dean) => (
            <li key={dean.idDe} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                {dean.dean_last_name}, {dean.dean_first_name} {dean.dean_middle_name}
              </span>
              <button className="p-button" onClick={() => deleter(dean.idDe)}>Delete</button>
            </li>
          ))
        )}

                </ul>

              </div>

              {showModal && (
                <AddDeanModal onClose={closeModal} onSubmit={handleDeanSubmit} />
              )}
        </div>


    </div>
  );
};

export default AdminDean;