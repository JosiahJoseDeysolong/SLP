import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './components/css/admincollege.css';
import NavbarProjectPage from "./components/NavbarProjectPage";
import { BASE_URL } from '../../../apiConfig'
import ReportSemesterGeneration from './components/ReportSemesterGeneration'

const AdminCollege = () => {
  const storedYear = localStorage.getItem('selectedYear');
  const storedSem = localStorage.getItem('selectedSem');

  const [listCol, setListCol] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);
  const navigate = useNavigate();
  const [sum, setSum] = useState('');

  let yearName = '';
  let yearId = '';
  let semName = '';
  let semId = '';

  if (storedYear) {
    const parsedYear = JSON.parse(storedYear);
    const parsedYearId = JSON.parse(storedYear);
    const parsedSem = JSON.parse(storedSem);
    const parsedSemID = JSON.parse(storedSem);

    yearName = parsedYear.year_name;
    yearId = parsedYearId.idSy;
    semName = parsedSem.semester_name;
    semId = parsedSemID.idSe;
  }

  const getColl = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/col-list/`);
      const data = response.data;
      if (response.status === 200) {
        const filteredCol = data.filter((col) => yearId === col.school_year && semId === col.semester);
        setListCol(filteredCol);
      } else {
        alert('Error fetching colleges.');
      }
    } catch (error) {
      alert('Error fetching colleges.');
    }
  };

  const getSumReport = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/query/semesters/${semId}/summary/`);
      const data = response.data;
      console.log(data)
      if (response.status === 200) {
        setSum(data);
      } else {
        alert('Error fetching summary.');
      }
    } catch (error) {
      alert('Error fetching summary.');
    }
  };

  useEffect(() => {
    getColl();
    getSumReport();
  }, []);

  const handleYearClick = (col) => {
    setSelectedCol(col);
    localStorage.setItem('selectedCol', JSON.stringify(col));
    navigate('/admin-project-list');
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
      
          <h1 className="adp-header-text">
            SY {yearName} {semName}
          </h1>



      <div
        className="py-students-container"
        style={{
          width: '400px',
          border: '2px solid #283971',
          padding: '10px',
        }}
      >
          <div
          className="py-students-container"
          style={{
            width: 'calc(100% - 24px)',
            padding: '5px',
            margin: '10px',
            overflow: 'auto',
            color: '#283971',
            fontWeight: 'bold',
          }}
        >
          Academic Programs Involved:  <span style={{ fontWeight: 'normal' }}>{sum.unique_academic_programs}</span>
        </div>
        <div
          className="py-students-container"
          style={{
            width: 'calc(100% - 24px)',
            padding: '5px',
            margin: '10px',
            overflow: 'auto',  
            color: '#283971',
            fontWeight: 'bold',
          }}>
           Total Projects: <span style={{ fontWeight: 'normal' }}>{sum.total_projects}</span>
        </div>
        <div
          className="py-students-container"
          style={{
            width: 'calc(100% - 24px)',
            padding: '5px',
            margin: '10px',
            overflow: 'auto',  
            color: '#283971',
            fontWeight: 'bold',
          }}>
           Completed Projects: <span style={{ fontWeight: 'normal' }}>{sum.completed_projects}</span>
        </div>
        <div
          className="py-students-container"
          style={{
            width: 'calc(100% - 24px)',
            padding: '5px',
            margin: '10px',
            overflow: 'auto',  
            color: '#283971',
            fontWeight: 'bold',
          }}>
           Ongoing Projects: <span style={{ fontWeight: 'normal' }}>{sum.ongoing_projects}</span>
        </div>
        <div
          className="py-students-container"
          style={{
            width: 'calc(100% - 24px)',
            padding: '5px',
            margin: '10px',
            overflow: 'auto',
            color: '#283971',
            fontWeight: 'bold',  
          }}>
           Total Students: <span style={{ fontWeight: 'normal' }}>{sum.total_students}</span>
        </div>

        
      </div>
      <ReportSemesterGeneration id={semId} />

      <div>
        <h1 className="adp-header-text">List of Colleges</h1>
      </div>
      
      <hr className="adp-header-underline custom-underline" />



      <div className="adp-year-container">
      <ul className="adp-year-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {listCol !== null &&
    listCol.map((col) => (
      <li
        key={col.idCol}
        onClick={() => handleYearClick(col)}
        className="adp-year-item"
        style={{
          border: '3px solid #283971',
          padding: '10px',
          margin: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#283971',
          fontSize: '30px',
        }}
      >
        {col.college_name}
      </li>
    ))}
</ul>

      </div>




    </div>
  );
};

export default AdminCollege;
