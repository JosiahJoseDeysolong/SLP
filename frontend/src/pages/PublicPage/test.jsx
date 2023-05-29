import React, { useEffect, useState } from 'react';
import axios from 'axios';

// this is only for testing / experimenting
// with something new. DO NOT PUSH


const Test = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundStudents, setFoundStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/private/stud-list/');
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.log("error >:(");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const students = data.filter(item =>
      item.student_first_name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFoundStudents(students);
  };

  return (
    <div>
      <h1>API Response:</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {foundStudents.length > 0 ? (
        <div>
          <h2>Found Students:</h2>
          {foundStudents.map(student => (
            <p key={student.idSt}>{student.student_first_name}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Test;

