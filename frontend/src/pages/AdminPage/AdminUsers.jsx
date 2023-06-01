import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../apiConfig';
import AuthContext from '../../context/AuthContext';


const AddUser = ({ onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setError('');
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setError('');
  };

  const handleIsStaffChange = (e) => {
    setIsStaff(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const newUser = {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        is_staff: isStaff,
      };

       const response = await axios.post(`${BASE_URL}/api/createuser/`, newUser);

 
       if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.username) {
        const errorMessage = error.response.data.username[0];
        setError(errorMessage);
      } else {
        setError('An error occurred while creating the user.');
      }
    }
  };

  return (
    <div className="p-modal">
      <div className="p-modal-content">
        <div
          className="adpy-page-container"
          style={{
             height: '510px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            background: '#EFEFEF',
            borderRadius: '20px', 
          }}
        >
          <h2 className="p-h2">Create User</h2>

           <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />
          <label>
            <input
              type="checkbox"
              checked={isStaff}
              onChange={handleIsStaffChange}
            />
            Is Admin
          </label>

           {error && <p>{error}</p>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="p-button" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" className="p-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDetails = ({ onClose, onSubmit, onDelete, user }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [error, setError] = useState('');
 
  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setIsStaff(user.is_staff);
  }, [user]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setError('');
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setError('');
  };

  const handleIsStaffChange = (e) => {
    setIsStaff(e.target.checked);
  };

  const deleteUser = async () => {
    try {  
      const storedTokens = localStorage.getItem('authTokens');
      if (storedTokens) {
        const authTokens = JSON.parse(storedTokens);
        const config = {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        };
        const response = await axios.delete(`http://127.0.0.1:8000/api/deleteuser/${user.id}/`, config);
        if (onDelete) {
          onDelete();
        }
       } else {
         console.error('Auth tokens not found');
      }
    } catch (error) {
      console.error(error);
     }
  };

  const handleSubmit = async () => {
    try {
      const updatedUser = {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        is_staff: isStaff,
      };

      const response = await axios.put(`${BASE_URL}/api/edituser/${user.id}/`, updatedUser);

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.username) {
        const errorMessage = error.response.data.username[0];
        setError(errorMessage);
      } else {
        setError('An error occurred while creating the user.');
      }
    }
  };

  return (
    <div className="p-modal">
      <div className="p-modal-content">
        <div
          className="adpy-page-container"
          style={{
             height: '510px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            background: '#EFEFEF',
            borderRadius: '20px', 
          }}
        >
          <h2 className="p-h2">Edit User</h2>

           <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />
          <label>
            <input
              type="checkbox"
              checked={isStaff}
              onChange={handleIsStaffChange}
            />
            Is Admin
          </label>

           {error && <p>{error}</p>}
        </div>

        <button type="button" className="p-button" onClick={deleteUser}>
            Delete User
        </button>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="p-button" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" className="p-button" onClick={onClose}>
            Cancel
          </button>
        </div>
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
  const [showDetailModel, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
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

  const handleUserDetailSubmit = () => {
    closeDetailModal();
    fetchUsers();
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
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
                }}
                onClick={() => handleUserClick(user)}>
              <div>{user.username}</div>
            </li>
          ))}
        </ul>
                  
        {showModel && (
                <AddUser 
                onClose={closeModal} 
                onSubmit={handleUserSubmit}/>
        )}

        {showDetailModel && (
          <UserDetails
            onClose={closeDetailModal}
            onSubmit={handleUserDetailSubmit}
            onDelete={handleUserDetailSubmit}
            user={selectedUser}
        />)}

      </div>
    </div>
  );
};

export default AdminUsers;
