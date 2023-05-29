import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './components/css/adminyear.css';
import AuthContext from '../../../context/AuthContext';
import NavbarProjectPage from "./components/NavbarProjectPage";
import { BASE_URL } from '../../../apiConfig'

const AdminYear = () => {
  const storedYear = localStorage.getItem('selectedYear');
  const [listSem, setListSem] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [yearG, setYearG] = useState(null);
  const [annualSlpPlanExists, setAnnualSlpPlanExists] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState(false); // New state variable

  let yearIdold = '';

  if (storedYear) {
    const parsedYear = JSON.parse(storedYear);
    yearIdold = parsedYear.idSy;
  }

  const getIndYear = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/year-detail/${yearIdold}`);
      const data = response.data;
      if (response.status === 200) {
        setYearG(data);
        setAnnualSlpPlanExists(data && data.annual_slp_plan !== null); // Add null check
      } else {
        alert('Error fetching Year.');
      }
    } catch (error) {
      alert('Error fetching Year.');
    }
  };

  const getSems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/sem-list/`);
      const data = response.data;
      if (response.status === 200) {
        const filteredSems = data.filter((sem) => yearG && yearG.idSy === sem.school_year);
        setListSem(filteredSems);
      } else {
        alert('Error fetching sems.');
      }
    } catch (error) {
      alert('Error fetching sems.');
    }
  };

  const handleYearClick = (sem) => {
    setSelectedSem(sem);
    localStorage.setItem('selectedSem', JSON.stringify(sem));
    navigate('/admin-college');
  };

  const handleDeleteYearClick = async () => {
    try {
      console.log(yearG)
      if (yearG) {
        const response = await axios.delete(`${BASE_URL}/private/year-delete/${yearG.idSy}`);
        navigate('/admin-projects');
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['application/pdf'];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setFileSelected(true); // Set file selection status to true
    } else {
      setSelectedFile(null);
      setFileSelected(false); // Set file selection status to false
      alert('Please select a PDF file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const allowedTypes = ['application/pdf'];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setFileSelected(true); // Set file selection status to true
    } else {
      setSelectedFile(null);
      setFileSelected(false); // Set file selection status to false
      alert('Please drop a PDF file.');
    }
  };

  const handleUpload = async () => {
    console.log(yearG)
    if (selectedFile && yearG) {
      const formData = new FormData();
      formData.append('file', selectedFile, `SY_${yearG.year_name}_Annual_Plan`);

      try {
        setIsUploading(true);

        const response = await axios.put(
          `${BASE_URL}/query/api/school-year/${yearG.idSy}/file/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log(response.data);
        setIsUploading(false);
        setAnnualSlpPlanExists(true);

        getIndYear();
      } catch (error) {
        console.error(error);
        setIsUploading(false);
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleDelete = async () => {
    try {
      console.log(yearG)
      setAnnualSlpPlanExists(false);
      setFileSelected(false)
      if (yearG) {
        const response = await axios.delete(
          `${BASE_URL}/query/api/school-year/${yearG.idSy}/file/`
        );
        setAnnualSlpPlanExists(false);
        setSelectedFile(null); // Reset the selected file
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    console.log(yearG)
    try {
      if (yearG) {
        const response = await axios.get(
          `${BASE_URL}/query/api/school-year/${yearG.idSy}/file/`,
          { responseType: 'blob' }
        );

        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `SY_${yearG.year_name}_Annual_Plan.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIndYear();
  }, []);

  useEffect(() => {
    if (yearG) {
      getSems();
    }
  }, [yearG]);

  return (
   

    <div className="adpy-page-container">
      <NavbarProjectPage />
 
      <div className="adp-header-container">
        <h1 className="adp-header-text">
          PROJECTS DIRECTORY
        </h1>
        <hr className="adp-header-underline" />

        
      </div>

        {yearG && (
          <h1 className="adp-header-text">
            SY {yearG.year_name}
          </h1>
        )}

        <hr className="adp-header-underline custom-underline" />



        {yearG && (
                  <div>
                    <h1 className="adpy-header-1">Annual SLP plan</h1>
                  </div>
                )}

        {annualSlpPlanExists ? (
          <div>

            

            <button className="adpy-year-item" 
            onClick={handleDownload}
            style={{
              color: '#FFFFFF',
              borderColor: '#283971',
              backgroundColor: '#283971',
              transition: 'background-color 0.2s, border-color 0.2s',
            }}

onMouseEnter={(e) => {
    e.target.style.backgroundColor = '#3A53A5';
    e.target.style.borderColor = '#3A53A5';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = '#283971';
    e.target.style.borderColor = '#283971';
  }}
>              
              Download File
            </button>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

            <button
                className="adpy-year-item"
                onClick={handleDelete}
                style={{ width: '180px' }}
              >
              Delete File
              </button>
            </div>

          </div>
        ) : (
          <div>
            <div
              className={`adpy-file-upload-container ${
                fileSelected ? 'adpy-file-selected' : ''
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
          {fileSelected && (
            <div className="adpy-file-selected">
              <div className="adpy-file-name">{selectedFile && selectedFile.name}</div>
              <button className="adpy-clear-file" onClick={() => {
                setFileSelected(false);
                setSelectedFile(null); // Reset the selected file
              }}>
                Clear
              </button>
            </div>
          )}

{!fileSelected && (




<label htmlFor="adpy-file-upload" className="adpy-file-upload-label">
  Drag a PDF file or <span className="adpy-file-upload-link" style={{ color: 'blue' }}>browse</span> files
</label>


)}              
              <input
                id="adpy-file-upload"
                type="file"
                onChange={handleFileChange}
                className="adpy-file-upload-input"
              />
            </div>

            <div className="adpy-upload-button-container" style={{ display: 'flex', justifyContent: 'center' }}>
<button
  className="adpy-year-item"
  onClick={handleUpload}
  disabled={isUploading}
  style={{
    color: '#FFFFFF',
    borderColor: '#283971',
    backgroundColor: '#283971',
    transition: 'background-color 0.2s, border-color 0.2s',
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = '#3A53A5';
    e.target.style.borderColor = '#3A53A5';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = '#283971';
    e.target.style.borderColor = '#283971';
  }}
>
  {isUploading ? 'Uploading...' : 'Upload File'}
</button>



</div>


          </div>
        )}

        
      
      <div className="adp-year-container">
  <ul className="adpy-year-list">
    {listSem &&
      listSem.map((sem, index) => (
        <div
          key={sem.idSe}
          onClick={() => handleYearClick(sem)}
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
          
          
          // Custom width and font
        >
          {sem.semester_name}
        </div>
      ))}
  </ul>
</div>
        <button
                className="adpy-year-item"
                onClick={handleDeleteYearClick}
                style={{ width: '180px' }}
              >
            Delete Year
              </button>
      
    </div>
  );
};

export default AdminYear;
