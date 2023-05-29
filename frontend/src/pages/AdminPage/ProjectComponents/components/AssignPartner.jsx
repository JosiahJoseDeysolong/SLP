import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../../apiConfig';
import axios from 'axios';
import './css/projectaddforms.css';

const AssignPartner = ({ onClose, onSubmit, projectId }) => {
  const id = projectId;

  const [assignedPartners, setAssignedPartners] = useState([]);
  const [unassignedPartners, setUnassignedPartners] = useState([]);

  const handleAssign = (partner) => {
    console.log(partner)
    axios
      .put(`${BASE_URL}/query/projects/${id}/assign-partner/${partner.idPa}/`,{
        partner_id: partner.idPa,
        project_id: id,

      })
      .then(response => {
        setAssignedPartners([...assignedPartners, partner]);
        setUnassignedPartners(unassignedPartners.filter(p => p.idPa !== partner.idPa));
        fetchUnassignedPartners();
      })
      .catch(error => {
        console.error('Error assigning partner to project:', error);
      });
  };

  const fetchUnassignedPartners = () => {
    axios
      .get(`${BASE_URL}/query/projects/${id}/partner-not-in-project/`)
      .then(response => {
        setUnassignedPartners(response.data);
      })
      .catch(error => {
        console.error('Error fetching unassigned partners:', error);
      });
  };

  useEffect(() => {
    fetchUnassignedPartners();
  }, []);

  return (
    <div className="f-modal">
      <div className="f-modal-content">
        <div className="f-students-container">
          <div className="description" style={{ color: '#283971', fontSize: '24px', overflowWrap: 'break-word' }}>
            <h2 className="f-h2">Partners</h2>
            <div className="f-student-list">
              {unassignedPartners.map(partner => (
                <div key={partner.idPa}>
                  {partner.partner_name}
                  <button onClick={() => handleAssign(partner)}>Change</button>
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

export default AssignPartner;
