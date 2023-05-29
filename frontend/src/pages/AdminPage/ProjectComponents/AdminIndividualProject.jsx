import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarProjectPage from "./components/NavbarProjectPage";
import { BASE_URL } from '../../../apiConfig';
import './components/css/ain.css'
import { useNavigate } from 'react-router-dom';
import EditStudent from './components/AddStudent'
import ReportGeneration from './components/ReportGeneration'
import EditFaculty from './components/AddFaculty'
import ChangePartner from './components/AssignPartner'

const EditProjectModal = ({ onClose, onSubmit }) => {
  const storedProj = JSON.parse(localStorage.getItem('selectedProj'));
  const [projectName, setProjectName] = useState(`${storedProj.project_name}`);
  const [acaPro, setAcaPro] = useState(`${storedProj.academic_program}`);
  const [subjHo, setSubjHo] = useState(`${storedProj.subject_hosted}`);
  const [projectDesc, setProjectDesc] = useState(`${storedProj.project_description}`);  
  const [status, setStatus] = useState(`${storedProj.status}`);
  const [sltype, setSltype] = useState(`${storedProj.sl}`);
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

    try {
      console.log("storedProj");
      console.log(storedProj.idPr);
    
      const response = await axios.post(`${BASE_URL}/private/proj-update/${storedProj.idPr}/`, {
        project_name: `${projectName}`,
        project_description: `${projectDesc}`,
        status: `${status}`,
        sl: `${sltype}`,
        subject_hosted: `${subjHo}`,
        academic_program: `${acaPro}`,
       });
    
      if (response.status === 200) {

        const detailResponse = await axios.get(`${BASE_URL}/private/proj-detail/${storedProj.idPr}/`);

        if (detailResponse.status === 200) {
          const updatedProjData = detailResponse.data;
          localStorage.setItem('selectedProj', JSON.stringify(updatedProjData));
        }
  






        onSubmit();
      }  
    } catch (error) {
      console.error('Error:', error);
      setError('Something Went Wrong... Name is Taken from the College');
    }

  



  };

  return (
    <div className="fpa-add-project-modal">
      <div className="fpa-modal-container">
        <div className="fpa-modal-content">
          <h2 className="fpa-modal-heading">Edit the project</h2>
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

        <div className="fpa-input-container">
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
            <label htmlFor="status" className="fpa-input-label">
              Status:
            </label>
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
            <label htmlFor="status" className="fpa-input-label">
              SLP Type:
            </label>
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

        <div className="fpa-input-container">
          <div className="fpa-input-label">Description</div>
          <textarea
            name="projectDesc"
            value={projectDesc}
            onChange={handleDescriptionChange}
            className="fpa-input-field fpa-textarea"
            placeholder="Enter the project description"
            required
          />
        </div>

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

const AdminIndividualProject = () => {
  const storedProj = JSON.parse(localStorage.getItem('selectedProj'));
  const storedYear = JSON.parse(localStorage.getItem('selectedYear'));
  const storedSem = JSON.parse(localStorage.getItem('selectedSem'));
  const [proj, setProj] = useState({});
  const [nst, setNst] = useState(null);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [partner, setPartner] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showStudModal, setShowStudModal] = useState(false);
  const [showFaculModal, setShowFaculModal] = useState(false);
  const [showPartnerModal, setPartnerModal] = useState(false);

  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showDownloadCMO, setShowDownloadCMO] = useState(false);

  const imageWidth = 400;
  const imageHeight = 350;
  const navigate = useNavigate();
  const id = storedProj.idPr;

  let semName = '';
  let yearName = '';

  yearName = storedYear.year_name;
  semName = storedSem.semester_name;

  const handleEditSClick = () => {
    setShowStudModal(true);
  };

  const handleStudModalClose = () => {
    setShowStudModal(false);
    getStudents();
  };

  const handleEditFClick = () => {
    setShowFaculModal(true);
  };

  const handleFaculClose = () => {
    setShowFaculModal(false);
    getFaculs();
  };

  const handleChangePClick = () => {
    setPartnerModal(true);
  };

  const handlePartnerClose = () => {
    setPartnerModal(false);
    getPartner();
  };


  const handleUploadClick = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.put(`${BASE_URL}/query/project-output/${id}/file/`, formData);  
      setShowDownloadButton(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
//cmo
  const handleUploadClickCMO = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.put(`${BASE_URL}/query/project-cmo/${id}/file/`, formData);  
      setShowDownloadCMO(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
//com
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/query/project-output/${id}/file/`);  
      setShowDownloadButton(false);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  //cmo
  const handleDeleteClickCMO = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/query/project-cmo/${id}/file/`);  
      setShowDownloadCMO(false);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  //cmo

  const handleDownloadClick = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/query/project-output/${id}/file/`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'project_output.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  //cmo

  const handleDownloadClickCMO = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/query/project-cmo/${id}/file/`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'project_cmo.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  //cmo
  
  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleDelteProjectClick = async () => {
    try {
      console.log(storedProj.project_name);
      if (id) {
        const response = await axios.delete(`http://127.0.0.1:8000/private/proj-delete/${id}`);
        navigate('/admin-project-list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('project_detail_picture', file);

    try {
      await axios.post(`${BASE_URL}/query/projects/${id}/image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully');
      getProject();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/query/projects/${id}/image/`);
      console.log('Image deleted successfully');
      setImageUrl('');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const getProject = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/private/proj-detail/${id}`);

      if (response.status === 200) {
        setProj(response.data);
      } else {
         navigate('/admin-projects');

      }
    } catch (error) {
       navigate('/admin-projects');

    }

    try {
      const Nresponse = await axios.get(`${BASE_URL}/query/projects/${id}/students/count/`);
      if (Nresponse.status === 200) {
        setNst(Nresponse.data);
      } else {
        navigate('/admin-projects');
      }
    } catch (error) {
      navigate('/admin-projects');
    }

    try {
      const imageResponse = await axios.get(`${BASE_URL}/query/projects/${id}/image/`);
      const imageBaseUrl = `${BASE_URL}`;
      const imageUrl = imageBaseUrl + imageResponse.data.image_url;
      setImageUrl(imageUrl);
      console.log(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    getFaculs();
    getStudents();
    getPartner();

  };

  const getStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/query/get/${id}/students`);
      if (response.status === 200) {
        setStudents(response.data.students);
       } else {
       }
    } catch (error) {
     }
  };

  const getFaculs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/query/get/${id}/faculty/`);
      if (response.status === 200) {
        setFaculty(response.data.faculty);
       } else {
       }
    } catch (error) {
     }
  };

  const getPartner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/query/get/${id}/partner/`);
       if (response.status === 200) {
        setPartner(response.data.partner);
       } else {
       }
    } catch (error) {
     }
  };
  
  useEffect(() => {
    getProject();
    getStudents();
    getFaculs();
    getPartner();
  }, []);

  useEffect(() => {
    const checkProjectOutput = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/query/project-output/${id}/file/`);
        setShowDownloadButton(true);
      } catch (error) {
        setShowDownloadButton(false);
      }
    };
    checkProjectOutput();

    const checkProjectCMO = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/query/project-cmo/${id}/file/`);
        setShowDownloadCMO(true);
      } catch (error) {
        setShowDownloadCMO(false);
      }
    };

    checkProjectCMO();

  }, [id]);

  return (
    <div className="adpy-page-container">
      <NavbarProjectPage />
      <div className="adp-header-container">
        <h1 className="adp-header-text">PROJECTS DIRECTORY</h1>
        <hr className="adp-header-underline" />
      </div>
      <div className="edit-button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="edit-button" onClick={handleEditClick}>
          Edit Project
        </button>
        <ReportGeneration projectID={storedProj.idPr} />
        <button className="edit-button" onClick={handleDelteProjectClick}>
          Delete Project
        </button >
  </div>
      <div className="inv-main-container" style={{ border: '2px solid #283971' }}>
        <div className="inv-inner-container">
          <div className="inv-column">
          <div className="py-students-container" 
              style={{ width: '400px', border: '2px solid #283971', padding: '10px' }}>
              {imageUrl && (
                <img
                  id="projectImage"
                  src={imageUrl}
                  alt="Upload Image"
                  style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
                />
              )}
            </div>
            <div className="inv-button-pic">
              <label htmlFor="fileInput">
                {imageUrl ? 'Change' : 'Upload a Picture'}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
              {imageUrl && (
                <label className="inv-button-pic" onClick={handleImageDelete}>
                  Delete
                </label>
              )}
            </div>
         
            <div className="inv-left-column">       
              <div className="py-students-container" style={{ width: '400px', border: '2px solid #283971', padding: '10px' }}>
                <div style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>
                  <div className="row-label" style={ {fontWeight: 'bold', }}>SCHOOL YEAR</div>
                  <div className="row-value">SY {yearName}</div>
                </div>
                <div style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>
                  <div className="row-label" style={ {fontWeight: 'bold', }}>SLP TYPE</div>
                  <div className="row-value">{proj.sl}</div>
                </div>
                <div style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>
                  <div className="row-label" style={ {fontWeight: 'bold', }}># OF STUDENTS</div>
                  <div className="row-value">
                    {nst && nst.number_of_students > 0 && <div>{nst.number_of_students}</div>}
                  </div>
                </div>
                <div style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>
                  <div className="row-label" style={ {fontWeight: 'bold', }}>SEMESTER</div>
                  <div className="row-value">{semName}</div>
                </div>
                <div style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>
                  <div className="row-label" style={ {fontWeight: 'bold', }}>ACADEMIC PROGRAM</div>
                  <div className="row-value">{proj.academic_program}</div>
                </div>
                <div style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>
                  <div className="row-label" style={ {fontWeight: 'bold', }}>SUBJECT HOSTED</div>
                  <div className="row-value">{proj.subject_hosted}</div>
                </div>
              </div>



          </div>


            <div className="inv-list-stud" style={{ marginTop: '10px' }}>
              <h2 className="student-header">
                <span className="header-text" >List of Students</span>

                <button className="edit-button" 
                  onClick={handleEditSClick}>Edit
                </button>

           

              </h2>
              <div className="py-students-container" 
              style={{ width: '400px', border: '2px solid #283971', padding: '10px' }}>

                {students.map((student) => (
                  <div key={student.idSt} className="student-item" style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>

                    {student.last_name}, {student.first_name} {student.middle_name}
                  </div>
                ))}
              </div>
            </div>



          </div>
          <div className="inv-column">
            <h1 className="header-text" style={{ fontSize: '40px', textAlign: 'center' }}>
              PROJECT TITLE
            </h1>
            <h1 className="header-text" style={{ fontSize: '50px', textAlign: 'center' }}>
              {proj.project_name}
            </h1>
            <div style={{ textAlign: 'center' }}>
              <div className="status" style={{ fontWeight: 'bold', color: '#283971', fontSize: '24px' }}>
                Status: {proj.status}
              </div>
            </div>

            <div className="py-students-container" 
     style={{ width: '400px', border: '2px solid #283971', padding: '10px' }}>

      

  <div className="description" style={{ color: '#283971', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
    Description:
  </div>

  <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>
    {proj.project_description}
  </div>

</div>
    <div className="py-students-container" 
      style={{
        width: '400px',
        border: '2px solid #283971',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {showDownloadButton ? (
        <>
          <button
            className="inv-button-pic"
            onClick={handleDownloadClick}
            style={{
              border: '2px solid #283971',
              padding: '10px',
              backgroundColor: '#fff',
              color: '#283971',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'border-color 0.3s, background-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#4682b4';
              e.target.style.backgroundColor = '#4682b4';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#283971';
              e.target.style.backgroundColor = '#fff';
              e.target.style.color = '#283971';
            }}
          >
            Download Project Output
          </button>

          <button
            className="inv-button-pic"
            onClick={handleDeleteClick}
            style={{
              border: '2px solid #283971',
              padding: '10px',
              backgroundColor: '#fff',
              color: '#283971',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'border-color 0.3s, background-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#4682b4';
              e.target.style.backgroundColor = '#4682b4';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#283971';
              e.target.style.backgroundColor = '#fff';
              e.target.style.color = '#283971';
            }}
          >
            Delete Project Output
          </button>
        </>
      ) : (
        <label className="inv-button-pic">
          Upload Project Output
          <input
            type="file"
            className="upload-button"
            accept=".pdf"
            onChange={handleUploadClick}
          />
        </label>
      )}
    </div>





    <div className="py-students-container" 
      style={{
        width: '400px',
        border: '2px solid #283971',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {showDownloadCMO ? (
        <>
          <button
            className="inv-button-pic"
            onClick={handleDownloadClickCMO}
            style={{
              border: '2px solid #283971',
              padding: '10px',
              backgroundColor: '#fff',
              color: '#283971',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'border-color 0.3s, background-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#4682b4';
              e.target.style.backgroundColor = '#4682b4';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#283971';
              e.target.style.backgroundColor = '#fff';
              e.target.style.color = '#283971';
            }}
          >
            Download CMO
          </button>

          <button
            className="inv-button-pic"
            onClick={handleDeleteClickCMO}
            style={{
              border: '2px solid #283971',
              padding: '10px',
              backgroundColor: '#fff',
              color: '#283971',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'border-color 0.3s, background-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#4682b4';
              e.target.style.backgroundColor = '#4682b4';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#283971';
              e.target.style.backgroundColor = '#fff';
              e.target.style.color = '#283971';
            }}
          >
            Delete CMO
          </button>
        </>
      ) : (
        <label className="inv-button-pic">
          Upload CMO
          <input
            type="file"
            className="upload-button"
            accept=".pdf"
            onChange={handleUploadClickCMO}
          />
        </label>
      )}
    </div>

    <div className="inv-list-stud" style={{ marginTop: '10px' }}>
              <h2 className="student-header">
                <span className="header-text" >Partner</span>

                <button className="edit-button" 
                  onClick={handleChangePClick}>Edit
                </button>

           

              </h2>
              <div className="py-students-container" 
              style={{ width: '400px', border: '2px solid #283971', padding: '10px' }}>

                <div className="description" style={{ color: '#283971', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                  Name:
                </div>

                <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>
                  {partner.partner_name}
                </div>

                <div className="description" style={{ color: '#283971', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                  Location:
                </div>

                <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>
                  {partner.partner_location }
                </div>

                <div className="description" style={{ color: '#283971', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                  Description:
                </div>

                <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>
                  {partner.partner_description}
                </div>
            
              </div>
            </div>


    <div className="inv-list-stud" style={{ marginTop: '10px' }}>
              <h2 className="student-header">
                <span className="header-text" >List of Faculty</span>

                <button className="edit-button" 
                  onClick={handleEditFClick}>Edit
                </button>

           

              </h2>
              <div className="py-students-container" 
              style={{ width: '400px', border: '2px solid #283971', padding: '10px' }}>

                {faculty.map((faculty) => (
                  <div key={faculty.idFa} className="student-item" style={{ color: '#283971', marginBottom: '5px', fontSize: '25px' }}>

                    {faculty.last_name}, {faculty.first_name} {faculty.middle_name}
                  </div>
                ))}
              </div>
            </div>




          </div>
        </div>

        {showModal && (
          <EditProjectModal
            onClose={() => {
              setShowModal(false);
            }}
            onSubmit={() => {
              setShowModal(false);
              getProject();
              getStudents();
              getFaculs();
            }}
          />
        )}

        {showStudModal && (
          <EditStudent
          onClose={handleStudModalClose}
          onSubmit={() => {
            getStudents();
            getProject();
            }}
            projectId={id}
          />
        )}

        {showFaculModal && (
          <EditFaculty
          onClose={handleFaculClose}
          onSubmit={() => {
            getFaculs();
            }}
            projectId={id}
          />
        )}


        {showPartnerModal && (
          <ChangePartner
          onClose={handlePartnerClose}
          onSubmit={() => {
            getPartner();
            }}
            projectId={id}
          />
        )}

        





      </div>
    </div>
  );
};

export default AdminIndividualProject;
