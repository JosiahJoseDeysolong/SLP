import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../apiConfig';

const ReportSemesterGeneration = ({id: semID}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateReport = () => {
    setLoading(true);
        axios.get(`${BASE_URL}/query/download_semester_data/${semID}`, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Semester_Data.docx');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        }) .catch(error => {
          console.error('Error downloading the file:', error);
        });

      };


  return (
    <div>
      <button className="edit-button" onClick={handleGenerateReport} disabled={loading}>
        Generate Report
      </button>
      </div>
  );
};

export default ReportSemesterGeneration;
