import React, { useContext, useState } from 'react'
import ReactModal from 'react-modal';
import { BASE_URL } from '../../../apiConfig'
function AddYearModal() {


    const getYears = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/private/year-create/`);
          const data = response.data;
          if (response.status === 200) {
            const sortedYears = data.sort((a, b) => a.year_name.localeCompare(b.year_name));
            setYears(sortedYears);
          } else {
            alert('Error fetching years.');
          }
        } catch (error) {
          alert('Error obtaining years.');
        }
      };



  return (
    
    <div>

    </div>

  );
}

export default AddYearModal;
