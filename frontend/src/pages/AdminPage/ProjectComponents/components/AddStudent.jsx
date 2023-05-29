import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../../apiConfig';
import axios from 'axios';
import './css/projectaddforms.css';

const AssignUnassignStudent = ({ onClose, onSubmit, projectId }) => {
  const id = projectId;

  const [assignedStudents, setAssignedStudents] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);

  const handleAssign = (student) => {
    // Add student to the project
    axios
      .post(`${BASE_URL}/query/add-student-to-project/`, {
        project_id: id,
        student_id: student.idSt
      })
      .then(response => {
        // Update assigned and unassigned students after successful addition
        setAssignedStudents([...assignedStudents, student]);
        setUnassignedStudents(unassignedStudents.filter(s => s.idSt !== student.idSt));
        fetchAssign()
        fetchUnassign()
      })
      .catch(error => {
        console.error('Error adding student to project:', error);
      });
  };

  const handleUnassign = (student) => {
    // Remove student from the project
    axios
      .post(`${BASE_URL}/query/remove-student-from-project/`, {
        project_id: id,
        student_id: student.idSt
      })
      .then(response => {
        // Update assigned and unassigned students after successful removal
        setUnassignedStudents([...unassignedStudents, student]);
        setAssignedStudents(assignedStudents.filter(s => s.idSt !== student.idSt));
        fetchAssign()
        fetchUnassign()
      })
      .catch(error => {
        console.error('Error removing student from project:', error);
      });
  };

  const fetchUnassign = () => {
    // Remove student from the project
    axios
    .get(`${BASE_URL}/query/projects/${id}/students-not-in-project/`)
    .then(response => {
      setUnassignedStudents(response.data);
    })
    .catch(error => {
      console.error('Error fetching unassigned students:', error);
    });
  };

  
  const fetchAssign = () => {
    // Remove student from the project
    axios
    .get(`${BASE_URL}/query/get/${id}/students`)
    .then(response => {
      setAssignedStudents(response.data.students);
    })
    .catch(error => {
      console.error('Error fetching assigned students:', error);
    });
};

  

  useEffect(() => {
    // Fetch assigned students
    axios
      .get(`${BASE_URL}/query/get/${id}/students`)
      .then(response => {
        setAssignedStudents(response.data.students);
      })
      .catch(error => {
        console.error('Error fetching assigned students:', error);
      });

    // Fetch unassigned students
    axios
      .get(`${BASE_URL}/query/projects/${id}/students-not-in-project/`)
      .then(response => {
        setUnassignedStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching unassigned students:', error);
      });
  }, []);

  return (
    <div className="f-modal">
      <div className="f-modal-content">
        <div className="f-students-container">
        <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>
          <h2 className="f-h2">Assigned Students</h2>
            <div className="f-student-list">
              {assignedStudents.map(student => (
                <div key={student.idSt}>
                  {student.last_name}, {student.first_name} {student.middle_name}
                  <button onClick={() => handleUnassign(student)}>-</button>
                </div>
              ))}
            </div>
          </div>

          <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>
            <h2 className="f-h2">Unassigned Students</h2>
            <div className="f-student-list">
              {unassignedStudents.map(student => (
                <div key={student.idSt}>
                  {student.student_last_name}, {student.student_first_name} {student.student_middle_name}
                  <button onClick={() => handleAssign(student)}>+</button>
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

export default AssignUnassignStudent;
