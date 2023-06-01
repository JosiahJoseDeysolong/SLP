import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarProjectPage from "./components/NavbarProjectPage";
import './components/css/projectsnav.css';
import { BASE_URL } from '../../../apiConfig'

const AddPartnerModal = ({ onClose, onSubmit }) => {

  const [parterName, setPartnerName] = useState('');
  const [partnerLocation, setPartnerLocation] = useState('');
  const [partnerDescription, setPartnerDescription] = useState('');
  const [error, setError] = useState('');

  const handleFirstChange = (e) => {
    setPartnerName(e.target.value);
    setError('');
  };

  const handleLastChange = (e) => {
    setPartnerLocation(e.target.value);
    setError('');
  };

  const handleMiddleChange = (e) => {
    setPartnerDescription(e.target.value);
    setError('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!parterName.trim()) {
      setError('Partner Name is required');
      return;
    }

    if (!partnerLocation.trim()) {
      setError('Partner Location is required');
      return;
    }

    if (!partnerDescription.trim()) {
      setError('Partner Description is required');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/private/partner-create/`, {
        partner_name: `${parterName}`,
        partner_location: `${partnerLocation}`,
        partner_description: `${partnerDescription}`,
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
      <h2 className="p-h2">Add Partner</h2>
    </div>
    <form onSubmit={handleSubmit} className="p-form-container">
      <label className="p-input-label">Partner Name:</label>
      <input
         
        name="firstName"
        value={parterName}
        onChange={handleFirstChange}
        className="p-input-field"
        placeholder="Enter the Partner's Name"
        required
      />

      <label className="p-input-label">Partner Location:</label>
      <input
        type="text"
        name="lastName"
        value={partnerLocation}
        onChange={handleLastChange}
        className="p-input-field"
        placeholder="Enter the Partner's Location"
        required
      />

      <label className="p-input-label">Description:</label>
      <textarea
        type="text"
        name="middleName"
        value={partnerDescription}
        onChange={handleMiddleChange}
        className="p-input-field"
        placeholder="Enter the description"
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

const AdminPartner = () => {
  const [listPartner, setListPartner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchB, setSearchB] = useState('');
  const [searchA, setSearchA] = useState([]);

  const [deleteD, setDeleteD] = useState([]);

  const navigate = useNavigate();

  const deleter = async (idPa) => {
    try {
      const response = await axios.delete(`${BASE_URL}/private/partner-delete/${idPa}`);
      const data = response.data;
      if (response.status === 200) {
        const deletedDean = listPartner.find(dean => dean.idPa === idPa);
        setDeleteD([...deleteD, deletedDean]);
        setListPartner(listPartner.filter(dean => dean.idPa !== idPa));
      } else {
        alert('Error Deleting.');
      }
    } catch (error) {
      alert('Error Deleting.');
    }
  };

  const adder = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/partner-list/`);
      const data = response.data;
      if (response.status === 200) {
        const sortedDeans = data.sort((a, b) => a.partner_name.localeCompare(b.partner_name));
        setListPartner(sortedDeans);
        
      } else {
        alert('Error fetching partners.');
      }
    } catch (error) {
      alert('Error fetching partners.');
    }
  };
  

  const searcher = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/query/search-partner/?q=${query}`);
      if (response.status === 200) {
        const sortedDeans = response.data.sort((a, b) => a.partner_name.localeCompare(b.partner_name));
        setSearchA(sortedDeans);
      } else {
        alert('Error fetching partners.');
      }
    } catch (error) {
      alert('Error fetching partners.');
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
        <h1 className="ap-header-text">PARTNER DIRECTORY</h1>
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
        <button className = "p-button"  onClick={openModal}>Add Partner</button>
      
        </div>
      <div className="p-students-container">
        <ul className="p-h3">


        {searchB.trim() !== '' ? (
  searchA.map((partner) => (
    <li key={partner.idPa} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>
        {partner.partner_name}
      </span>
      <button className="p-button" onClick={() => deleter(partner.idPa)}>Delete</button>
    </li>
  ))
) : (
  // Render default list of deans if search bar is empty and listDean is not null
  listPartner !== null &&
  listPartner.map((partner) => (
    <li key={partner.idPa} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>
        {partner.partner_name}
      </span>
      <button className="p-button" onClick={() => deleter(partner.idPa)}>Delete</button>
    </li>
  ))
)}




        </ul>

        

      </div>

      

      {showModal && (
        <AddPartnerModal onClose={closeModal} onSubmit={handleDeanSubmit} />
      )}
</div>


    </div>
  );
};

export default AdminPartner;