import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrarSearchResult from './RegistrarSearchResult';

import './css/adminRegistrar.css';

const RegistrarSearchBox = () => {
  const [data, setData] = useState([]);
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchMiddleName, setSearchMiddleName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [foundStudents, setFoundStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/private/stud-list/');
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.log("error >:(");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const students = data.filter(item =>
      item.student_first_name.toLowerCase().startsWith(searchFirstName.toLowerCase()) &&
      item.student_middle_name.toLowerCase().startsWith(searchMiddleName.toLowerCase()) &&
      item.student_last_name.toLowerCase().startsWith(searchLastName.toLowerCase())
    );
    setFoundStudents(students);
    setSelectedStudent(null); // Clear the selected student
  };

  const handleClickStudent = (student) => {
    setSelectedStudent(student);
  };


  return (
    <div className="RegistrarSearch">
      <div className="SearchBox">
        <h2 className="title-box">College</h2>

        <div className="title-box">
          <h2>Department</h2>
        </div>

        <h2 className="title-box">Name</h2>

        <div classname="search-bar">
          <input
            className="search-bar"
            type="text"
            value={searchFirstName}
            onChange={e => setSearchFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            className="search-bar"
            type="text"
            value={searchMiddleName}
            onChange={e => setSearchMiddleName(e.target.value)}
            placeholder="Middle Name"
          />
          <input
            className="search-bar"
            type="text"
            value={searchLastName}
            onChange={e => setSearchLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>

      </div>

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>

      <hr />

      <RegistrarSearchResult
        foundStudents={foundStudents}
        selectedStudent={selectedStudent}
        handleClickStudent={handleClickStudent}
      />
    </div>
  );
};

export default RegistrarSearchBox;

