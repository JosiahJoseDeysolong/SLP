import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../apiConfig'

const AdminGallery = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg']

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.include(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)')
    }
  }

  return (
    <div>
      <h1>Admin Gallery Pages</h1>

      <form>
        <input type="file" onChange={changeHandler} />
        <span></span>
        <div className="output">
          {error && <div className="error"> {error}</div>}
          {file && <div>{file.name}</div>}
        </div>
      </form>

      <p>Here is a gallery...</p>

    </div>
  );
};

export default AdminGallery;