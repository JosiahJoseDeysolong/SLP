import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../apiConfig';
import AuthContext from '../../context/AuthContext';

const AddUser = ({ onClose, onSubmit }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');


  const [error, setError] = useState('');

  const handleFirstChange = (e) => {
    setFirstName(e.target.value);
    setError('');
  };

  const handleLastChange = (e) => {
    setLastName(e.target.value);
    setError('');
  };

  const handleMiddleChange = (e) => {
    setMiddleName(e.target.value);
    setError('');
  };


 
  return (
    <div className="p-modal">
      <div className="p-modal-content">



        <button type="button" className="p-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};




const AdminUsers = () => {
  let { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModel, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSubmit = () => {
    closeModal();
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  return (
    <div>
      <div className="adp-header-container">
        <h1 className="adp-header-text">USERS DIRECTORY</h1>
        <hr className="adp-header-underline" />
      </div>
      <div className="adpy-page-container">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users"
            className="search-bar"
            style={{ marginBottom: '10px' }}
          />
        </div>

        <div className="p-students-container">
          <button className="p-button" onClick={openModal}>
            Create User
          </button>
        </div>

        <ul className="adp-year-list" 
        style={{ listStyle: 'none', padding: 0 }}>
          {filteredUsers.map((user) => (
            <li key={user.username}
                className="adp-year-item"
                style={{ 
                  border: '3px solid #283971',
                  padding: '10px',
                  margin: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#283971', 
                  fontSize: '20px',
                }}>
              <div>{user.username}</div>
            </li>
          ))}
        </ul>

        {showModel && (
                <AddUser 
                onClose={closeModal} 
                onSubmit={handleUserSubmit}/>
        )}

      </div>
    </div>
  );
};

export default AdminUsers;
