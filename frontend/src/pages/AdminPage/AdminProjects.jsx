import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './components/css/adminprojects.css';
import NavbarProjectPage from "./ProjectComponents/components/NavbarProjectPage";
import { BASE_URL } from '../../apiConfig'
import './ProjectComponents/components/css/projectsnav.css'

const AddYearModal = ({ onClose, onSubmit, listYear }) => {
  const [yearName, setYearName] = useState('');
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);

  const handleInputChange = (e) => {
    let { value } = e.target;
    value = value.slice(0, 4);

    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setYearName(value);
      setError('');

      if (!isNaN(value)) {
        setCount(parseInt(value) + 1);
      } else {
        setCount(0);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!yearName.trim()) {
      setError('Year Name is required');
      return;
    }

    if (listYear && listYear.some((year) => year.year_name === `${yearName}-${count}`)) {
      setError('Year Name already exists');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/query/auto-create-years/`, {
        year_name: `${yearName}-${count}`,
      });

      if (response.status === 200) {
        onSubmit();
      } else {
        setError('Taken Name');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something Went Wrong');
    }
  };

  return (
    <div className="adp-modal-overlay">
  <div className="adp-modal-container">
    <div className="adp-modal-header">
      <h2 className="adp-modal-header-text">Add School Year</h2>
    </div>

    <form onSubmit={handleSubmit} className="adp-modal-form">
      <label htmlFor="yearName" className="adp-modal-label">
        Year Name: {yearName}-{count}
      </label>
      <input
        type="text"
        id="yearName"
        name="yearName"
        value={yearName}
        onChange={handleInputChange}
        className="adp-modal-input"
      />

      {/* Error message */}
      {error && <div className="adp-modal-error">{error}</div>}

      <div className="adp-modal-buttons-container">
        <button type="submit" className="adp-modal-submit-button">
          Submit
        </button>

        <button type="button" onClick={onClose} className="adp-modal-cancel-button">
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

const AdminProjects = () => {
  const [listYear, setListYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getYears = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/year-list/`);
      const data = response.data;
      if (response.status === 200) {
        const sortedYears = data.sort((a, b) => a.year_name.localeCompare(b.year_name));
        setListYear(sortedYears);
      } else {
        alert('Error fetching years.');
      }
    } catch (error) {
      alert('Error fetching years.');
    }
  };

  useEffect(() => {
    getYears();
  }, []);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    localStorage.setItem('selectedYear', JSON.stringify(year));
    navigate('/admin-year');
  };

  const handleAddYearClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    getYears();
  };

  return (
    <div className="adpy-page-container">

          <NavbarProjectPage />
      <div className="adp-header-container">
        <h1 className="adp-header-text">
          PROJECTS DIRECTORY
        </h1>
        <hr className="adp-header-underline" />
      </div>
      


      

  <div className="adp-year-section">
  <h1 className="adp-header-text">
    SCHOOL YEARS
  </h1>

  <div className="py-students-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  
  <button className="adp-add-year-button" onClick={handleAddYearClick}>
    Add School Year
  </button>
  
  <ul className="adp-year-list" style={{ listStyle: 'none', padding: 0 }}>



    
    {listYear !== null &&
      listYear.map((year) => (
        <li
          key={year.idSy}
          onClick={() => handleYearClick(year)}
          className="adp-year-item"
          style={{ 
            border: '3px solid #283971',
            padding: '10px',
            margin: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#283971', 
            fontSize: '40px',
          }}
        >
          SY {year.year_name}
        </li>
      ))}
  </ul>

 

  {/* Add year modal */}
  {isModalOpen && (
    <div className="adp-modal-overlay">
      <AddYearModal
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        listYear={listYear}
      />
    </div>
  )}
</div>



</div>

    </div>
  );
};

export default AdminProjects;
