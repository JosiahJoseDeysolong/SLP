import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarProjectPage from "./components/NavbarProjectPage";
import './components/css/adminpeople.css';
import { BASE_URL } from '../../../apiConfig'

const AddCoorModal = ({ onClose, onSubmit }) => {

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
      const response = await axios.post(`${BASE_URL}/private/coord-create/`, {
        coor_first_name: `${firstName}`,
        coor_last_name: `${lastName}`,
        coor_middle_name: `${middleName}`,        
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
    <div >
      <div >
        <div >
          <h2 >Add Dean</h2>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="adpl-white-text">Title</div>

          <input
            type="text"
            name="projectName"
            value={firstName}
            onChange={handleFirstChange}
            placeholder="Enter the first name"
            required/>

          <input
            type="text"
            name="projectName"
            value={lastName}
            onChange={handleLastChange}
            placeholder="Enter the first name"
            required/>

          <input
            type="text"
            name="projectName"
            value={middleName}
            onChange={handleMiddleChange}
            placeholder="Enter the first name"
            required/>
  

          {/* Error message */}


          {error && <div>{error}</div>}
  
          <div>
            <button type="submit">
              Submit
            </button>
          </div>
  
          <div>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );

};

const AdminCoordinator = () => {
  const [listCoor, setListCoor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchC, setSearchC] = useState('');
  const [searchCoor, setSearchCoor] = useState([]);

  const navigate = useNavigate();

  const getCoors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/coord-list/`);
      const data = response.data;
      if (response.status === 200) {
        const sortedDeans = data.sort((a, b) => a.coor_last_name.localeCompare(b.coor_last_name));
        setListCoor(sortedDeans);
      } else {
        alert('Error fetching coordinators.');
      }
    } catch (error) {
      alert('Error fetching coordinators.');
    }
  };

  const searchCoors = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/query/search-dean/?q=${query}`);
      if (response.status === 200) {
        const sortedCoors = response.data.sort((a, b) => a.coor_last_name.localeCompare(b.coor_last_name));
        setSearchCoor(sortedCoors);
      } else {
        alert('Error fetching coordinators.');
      }
    } catch (error) {
      alert('Error fetching coordinators.');
    }
  };

  useEffect(() => {
    getCoors();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeanSubmit = () => {
    closeModal();
    getCoors();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchC(query);
    searchCoors(query);
  };

  return (
    <div className="adpy-page-container">
      <NavbarProjectPage />
      <div className="ap-header-container">
        <h1 className="ap-header-text">COORDINATOR DIRECTORY</h1>
        <hr className="ap-header-underline" />
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchC}
          onChange={handleSearchChange}
        />
        <button onClick={openModal}>Add Coordinator</button>
      </div>
      <ul>
        {/* Render search results if search bar is not empty */}
        {searchC.trim() !== '' ? (
          searchCoor.map((coor) => (
            <li key={coor.idDe}>
              {coor.coor_last_name}, {coor.coor_first_name} {coor.coor_middle_name}
            </li>
          ))
        ) : (
          // Render default list of deans if search bar is empty
          listCoor !== null &&
          listCoor.map((coor) => (
            <li key={coor.idCoor}>
              {coor.coor_last_name}, {coor.coor_first_name} {coor.coor_middle_name}
            </li>
          ))
        )}
      </ul>
  
      {showModal && (
        <AddCoorModal onClose={closeModal} onSubmit={handleDeanSubmit} />
      )}
    </div>
  );
};

export default AdminCoordinator;

