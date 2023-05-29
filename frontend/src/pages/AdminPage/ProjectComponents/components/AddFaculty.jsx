import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../../apiConfig';
import axios from 'axios';
import './css/projectaddforms.css';

const AssignUnassignFaculty = ({ onClose, onSubmit, projectId }) => {
  const id = projectId;

  const [assingedFaculty, setAssignedFaculty] = useState([]);
  const [unassignedFaculty, setUnassignedFaculty] = useState([]);

  const handleAssign = (faculty) => {
     axios
      .post(`${BASE_URL}/query/add-faculty-to-project/`, {
        project_id: id,
        faculty_id: faculty.idFa
      })
      .then(response => {
        setAssignedFaculty([...assingedFaculty, faculty]);
        setUnassignedFaculty(unassignedFaculty.filter(s => s.idSt !== faculty.idFa));
        fetchAssign()
        fetchUnassign()
      })
      .catch(error => {
        console.error('Error adding faculty to project:', error);
      });
  };

  const handleUnassign = (faculty) => {
      axios
      .post(`${BASE_URL}/query/remove-faculty-from-project/`, {
        project_id: id,
        faculty_id: faculty.idSt
      })
      .then(response => {
        setUnassignedFaculty([...unassignedFaculty, faculty]);
        setAssignedFaculty(assingedFaculty.filter(s => s.idSt !== faculty.idSt));
        fetchAssign()
        fetchUnassign()
      })
      .catch(error => {
        console.error('Error removing faculty from project:', error);
      });
  };

  const fetchUnassign = () => {
     axios
    .get(`${BASE_URL}/query/projects/${id}/faculty-not-in-project/`)
    .then(response => {
      setUnassignedFaculty(response.data);
    })
    .catch(error => {
      console.error('Error fetching unassigned faculty:', error);
    });
  };

  
  const fetchAssign = () => {
     axios
    .get(`${BASE_URL}/query/get/${id}/faculty`)
    .then(response => {
      setAssignedFaculty(response.data.faculty);
    })
    .catch(error => {
      console.error('Error fetching assigned faculty:', error);
    });
};

  

  useEffect(() => {
     axios
      .get(`${BASE_URL}/query/get/${id}/faculty/`)
      .then(response => {
        setAssignedFaculty(response.data.faculty);
      })
      .catch(error => {
        console.error('Error fetching assigned faculty:', error);
      });

     axios
      .get(`${BASE_URL}/query/projects/${id}/faculty-not-in-project/`)
      .then(response => {
        setUnassignedFaculty(response.data);
      })
      .catch(error => {
        console.error('Error fetching unassigned faculty:', error);
      });
  }, []);

  return (
    <div className="f-modal">
      <div className="f-modal-content">
        <div className="f-students-container">
        <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>            
        <h2 className="f-h2">Assigned Faculty</h2>
            <div className="f-student-list">
              {assingedFaculty.map(faculty => (
                <div key={faculty.idSt}>
                  {faculty.last_name}, {faculty.first_name} {faculty.middle_name}
                  <button onClick={() => handleUnassign(faculty)}>-</button>
                </div>
              ))}
            </div>
          </div>

          <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>            
          <h2 className="f-h2">Unassigned Faculty</h2>
            <div className="f-student-list">
              {unassignedFaculty.map(faculty => (
                <div key={faculty.idFa}>
                  {faculty.faculty_last_name}, {faculty.faculty_first_name} {faculty.faculty_middle_name}
                  <button onClick={() => handleAssign(faculty)}>+</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="f-submit-close">
          <button className="f-close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignUnassignFaculty;
