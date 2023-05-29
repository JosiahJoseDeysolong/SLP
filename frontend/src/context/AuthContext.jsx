import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  const [accessToken, setAccessToken] = useState(() =>
  authTokens ? authTokens.access : null
);

  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      const data = response.data;
      //console.log('data', data);
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/');
      } else {
        alert('Nein');
      }
    } catch (error) {
      alert('Something Went Wrong Loggin In');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/');
  };

  const updateToken = async () => {
    console.log('Update Token Called');
    try {
      const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
        refresh: authTokens.refresh,
      });
      const data = response.data;
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error('Error:', error);
      logoutUser();
    }
  };

  useEffect(() => {
    const fourM = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourM);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const contextData = {
    user: user,
    accessToken: accessToken,

    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
