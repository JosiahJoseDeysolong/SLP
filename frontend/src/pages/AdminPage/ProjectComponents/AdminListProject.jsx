import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './components/css/adminprojectlist.css' 
import NavbarProjectPage from "./components/NavbarProjectPage";
import { BASE_URL } from '../../../apiConfig'

const AddProjectModal = ({ onClose, onSubmit, listproj, yearId, semId, colId }) => {
  const [projectName, setProjectName] = useState('');
  const [acaPro, setAcaPro] = useState('');
  const [subjHo, setSubjHo] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [status, setStatus] = useState('Ongoing');
  const [sltype, setSltype] = useState('Direct');
  const [error, setError] = useState('');

  const handleProjectChange = (e) => {
    setProjectName(e.target.value);
    setError('');
  };

  const handleAcadChange = (e) => {
    setAcaPro(e.target.value);
    setError('');
  };

  const handleSubChange = (e) => {
    setSubjHo(e.target.value);
    setError('');
  };

  const handleDescriptionChange = (e) => {
    setProjectDesc(e.target.value);
    setError('');
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSlpChange = (e) => {
    setSltype(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setError('Project Name is required');
      return;
    }

    if (!acaPro.trim()) {
      setError('Academic Program required');
      return;
    }

    if (!subjHo.trim()) {
      setError('Subject Hosted required');
      return;
    }

    if (!projectDesc.trim()) {
      setError('Add a Description');
      return;
    }

    if (listproj && listproj.some((proj) => proj.project_name === projectName)) {
      setError('Project Name already exists');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/private/proj-create/`, {
        school_year: `${yearId}`,
        semester: `${semId}`,
        college: `${colId}`,
        project_name: `${projectName}`,
        
        academic_program: `${acaPro}`,
        subject_hosted: `${subjHo}`,
        status: `${status}`,
        sl: `${sltype}`,
        
        project_description: `${projectDesc}`,
        

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
<div className="fpa-add-project-modal">
  <div className="fpa-modal-container">
    <div className="fpa-modal-content">
      <h2 className="fpa-modal-heading">Add a project</h2>
    </div>
 

    <div className="fpa-input-row">
      <div className="fpa-input-container">
        <div className="fpa-input-label">Title</div>
        <input
          type="text"
          name="projectName"
          value={projectName}
          onChange={handleProjectChange}
          className="fpa-input-field"
          placeholder="Enter the project title"
          required
        />
      </div>

      <div className="fpa-input-container">
        <div className="fpa-input-label">Academic Program</div>
        <input
          type="text"
          name="acaPro"
          value={acaPro}
          onChange={handleAcadChange}
          className="fpa-input-field"
          placeholder="Enter the academic program"
          required
        />
      </div>
    </div>

    <div>
      <div className="fpa-input-label">Subject Hosted</div>
      <input
        type="text"
        name="subjHo"
        value={subjHo}
        onChange={handleSubChange}
        className="fpa-input-field"
        placeholder="Enter the subject hosted"
        required
      />
    </div>

    <div className="fpa-input-row">
  <div className="fpa-input-container">
    <label htmlFor="status" className="fpa-input-label">Status: </label>
    <select
      name="status"
      value={status}
      onChange={handleStatusChange}
      className="fpa-select-field"
      required
    >
      <option value="Ongoing">Ongoing</option>
      <option value="Completed">Completed</option>
    </select>
  </div>

  <div className="fpa-input-container">
    <label htmlFor="status" className="fpa-input-label">SLP Type: </label>
    <select
      name="status"
      value={sltype}
      onChange={handleSlpChange}
      className="fpa-select-field"
      required
    >
      <option value="Direct">Direct</option>
      <option value="Indirect">Indirect</option>
      <option value="Research">Research</option>
      <option value="Advocacy">Advocacy</option>
    </select>
  </div>
</div>




   
        <div className="fpa-input-label">Description</div>
        <textarea
              name="projectDesc"
              value={projectDesc}
              onChange={handleDescriptionChange}
              className="fpa-input-field fpa-textarea"
              placeholder="Enter the project description"
              required
            />
 
 
    {error && <div className="fpa-error-text">{error}</div>}

    <div className="fpa-button-row">
      <div>
        <button type="submit" onClick={handleSubmit} className="fpa-submit-button">
          Submit
        </button>
      </div>
      <div>
        <button type="button" onClick={onClose} className="fpa-cancel-button">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
  );
  
};


const AdminListProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storedYear = localStorage.getItem('selectedYear');
  const storedSem = localStorage.getItem('selectedSem');
  const storedCol = localStorage.getItem('selectedCol');
  const [listproj, setListProj] = useState(null);
  const [selectedProj, setSelectedProj] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();

  let yearName = '';
  let yearId = '';
  let semName = '';
  let semId = '';
  let colName = '';
  let colId = '';

  if (storedYear) {
    const parsedYear = JSON.parse(storedYear);
    const parsedYearId = JSON.parse(storedYear);
    const parsedSem = JSON.parse(storedSem);
    const parsedSemID = JSON.parse(storedSem);
    const parsedCol = JSON.parse(storedCol);
    const parsedColID = JSON.parse(storedCol);

    yearName = parsedYear.year_name;
    yearId = parsedYearId.idSy;
    semName = parsedSem.semester_name;
    semId = parsedSemID.idSe;
    colName = parsedCol.college_name;
    colId = parsedColID.idCol;
  }

  const getProj = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/proj-list/`);
      const data = response.data;
      if (response.status === 200) {
        const filteredProj = data.filter(
          (proj) => 
            yearId === proj.school_year && 
            semId === proj.semester && 
            colId === proj.college &&
            proj.project_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setListProj(filteredProj);
        setFilteredProjects(filteredProj);
      } else {
        alert('Error fetching projects.');
      }
    } catch (error) {
      alert('Error fetching projects.');
    }
  };

  useEffect(() => {
    getProj();
  }, [searchQuery]);

  const handleProjectClick = (proj) => {
    setSelectedProj(proj);
    localStorage.setItem('selectedProj', JSON.stringify(proj));
    navigate('/admin-individual-project');
  };

  const handleAddProjectClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    getProj();
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

        <h1 className="adp-header-text">
            {colName}
        </h1>

        <h1 className="adp-header-text">
            List of Projects
        </h1>

        <hr className="adp-header-underline custom-underline" />

    
        <div className="py-students-container"
  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search projects"
        className="search-bar"
        style={{ marginBottom: '10px' }}
      />
    </div>


      <div className="add-project-container">
        <button className="adp-add-year-button" onClick={handleAddProjectClick}>
          Add project
        </button>
      </div>


  <ul className="adp-year-list"
    style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

   

{filteredProjects !== null &&
  filteredProjects.map((proj) => (
    <li
      key={proj.idPr}
      onClick={() => handleProjectClick(proj)}
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
      <span className="project-name">{proj.project_name}</span>
    </li>
  ))}




  </ul>

  {isModalOpen && (
    <div className="adpl-modal-overlay">
      <AddProjectModal
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        listproj={listproj}
        yearId={yearId}
        semId={semId}
        colId={colId}
      />
    </div>
  )}
</div>




    </div>
  );
};

export default AdminListProject;