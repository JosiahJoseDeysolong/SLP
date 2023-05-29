import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarProjectPage from "./components/NavbarProjectPage";
import './components/css/adminpeople.css';
import { BASE_URL } from '../../../apiConfig'

const AddBenifModal = ({ onClose, onSubmit }) => {

  const [bName, setBName] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');

  const handleFirstChange = (e) => {
    setBName(e.target.value);
    setError('');
  };

  const handleLastChange = (e) => {
    setDesc(e.target.value);
    setError('');
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bName.trim()) {
      setError('Name is required');
      return;
    }

    if (!desc.trim()) {
      setError('Description is required');
      return;
    }


    try {
      const response = await axios.post(`${BASE_URL}/private/beni-create/`, {
        benificary_name: `${bName}`,
        benificary_description: `${desc}`,
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
          <h2 >Add Beneficiary</h2>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="adpl-white-text">Name</div>

          <input
            type="text"
            name="Benificary Name"
            value={bName}
            onChange={handleFirstChange}
            placeholder="Enter the benificary name"
            required/>

              <textarea
                name="Beneficiary Description"
                value={desc}
                onChange={handleLastChange}
                placeholder="Enter the description"
                required></textarea>
                

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

const AdminBeneficiary = () => {
  const [listBenificiary, setListBenificiary] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchB, setSearchB] = useState('');
  const [searchBenificiary, setBenificiary] = useState([]);

  const navigate = useNavigate();

  const getBenificiary = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/beni-list/`);
      const data = response.data;
      if (response.status === 200) {
        const sortedData = data.sort((a, b) => a.benificary_name.localeCompare(b.benificary_name));
        setListBenificiary(sortedData);
      } else {
        alert('Error fetching deans.');
      }
    } catch (error) {
      alert('Error fetching deans.');
    }
  };

  const searchBeni = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/query/search-benif/?q=${query}`);
      if (response.status === 200) {
        const sortedData = response.data.sort((a, b) => a.benificary_name.localeCompare(b.benificary_name));
        setBenificiary(sortedData);
      } else {
        alert('Error fetching deans.');
      }
    } catch (error) {
      alert('Error fetching deans.');
    }
  };

  useEffect(() => {
    getBenificiary();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBenifSubmit = () => {
    closeModal();
    getBenificiary();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchB(query);
    searchBeni(query);
  };

  return (
    <div className="adpy-page-container">
      <NavbarProjectPage />
      <div className="ap-header-container">
        <h1 className="ap-header-text">BENEFICIARY DIRECTORY</h1>
        <hr className="ap-header-underline" />
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchB}
          onChange={handleSearchChange}
        />
        <button onClick={openModal}>Add Beneficiary</button>
      </div>
      <ul>
        {/* Render search results if search bar is not empty */}
        {searchB.trim() !== '' ? (
          searchBenificiary.map((stud) => (
            <li key={stud.idSt}>
              {stud.benificary_name}
            </li>
          ))
        ) : (
          // Render default list of deans if search bar is empty and listDean is not null
          listBenificiary !== null &&
          listBenificiary.map((stud) => (
            <li key={stud.idSt}>
              {stud.benificary_name}
            </li>
          ))
        )}
      </ul>
  
      {showModal && (
        <AddBenifModal onClose={closeModal} onSubmit={handleBenifSubmit} />
      )}
    </div>
  );
};

export default AdminBeneficiary;