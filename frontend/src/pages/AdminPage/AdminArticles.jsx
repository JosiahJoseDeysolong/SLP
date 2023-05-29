import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './components/css/adminArticles.css'
import axios from 'axios';
import { BASE_URL } from '../../apiConfig';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {list: "ordered"},
      {list: "bullet"},
      {indent: "-1"},
      {indent: "+1"},
    ],
    ["link", "image", "video" ],
  ]

};

const AdminArticles = () => {
  // const [yearName, setYearName] = useState('');
  // const [error, setError] = useState('');
  // const [count, setCount] = useState(0);

  // const handleInputChange = (e) => {
  //   let { value } = e.target;
  //   value = value.slice(0, 4);

  //   if (value === '' || /^[0-9\b]+$/.test(value)) {
  //     setYearName(value);
  //     setError('');

  //     if (!isNaN(value)) {
  //       setCount(parseInt(value) + 1);
  //     } else {
  //       setCount(0);
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!yearName.trim()) {
  //     setError('Year Name is required');
  //     return;
  //   }

  //   if (listYear && listYear.some((year) => year.year_name === `${yearName}-${count}`)) {
  //     setError('Year Name already exists');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${BASE_URL}/query/auto-create-years/`, {
  //       year_name: `${yearName}-${count}`,
  //     });

  //     if (response.status === 200) {
  //       onSubmit();
  //     } else {
  //       setError('Taken Name');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setError('Something Went Wrong');
  //   }
  // };


  const handleButtonClick = () => {
    // Perform the desired action when the button is clicked
    console.log('Button clicked!');
  };

  const [value, setValue] = useState("");



  return (
    <div className='container'>
      <h1>ARTICLES DIRECTORY</h1>
      <button className="add-article" onClick={handleButtonClick}>
        Add Article
      </button>

      <div className='row'>
        <div className='editor'>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="editor-input"
            modules={modules}
          />
        </div>
        <div className='preview'
          dangerouslySetInnerHTML={{ __html: value}}
        />
      </div>
    </div>
  );
};

export default AdminArticles;

