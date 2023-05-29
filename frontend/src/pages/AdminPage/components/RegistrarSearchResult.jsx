import React from 'react';

const RegistrarSearchResult = ({ foundStudents, selectedStudent, handleClickStudent }) => {
  return (
    <div className="SearchResults">
      {foundStudents.length > 0 && !selectedStudent ? (
        <div>
          <h2>Search Results...</h2>
          {foundStudents.map(student => (
            <div className="student-list" key={student.idSt} onClick={() => handleClickStudent(student)}>
              <p className="name">{student.student_first_name}</p>
              <p className="name">{student.student_middle_name}</p>
              <p className="name">{student.student_last_name}</p>
            </div>
          ))}
        </div>
      ) : null}

      {selectedStudent && (
        <div className="SelectedStudent">
          <h2>Selected Student</h2>
          <p>{selectedStudent.student_first_name}</p>
          <p>{selectedStudent.student_middle_name}</p>
          <p>{selectedStudent.student_last_name}</p>
          <p>{selectedStudent.pre_sl}</p>
          <p>{selectedStudent.post_sl}</p>
          <p>{selectedStudent.cmo}</p>
        </div>
      )}
    </div>
  );
};

export default RegistrarSearchResult;
