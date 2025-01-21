import React, { createContext, useState, useContext , useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isTokenFetched, setIsTokenFetched] = useState(false);

  useEffect(() => {
    console.log('Username:', username);
    console.log('Email:', userEmail);
    console.log('Access Token:', accessToken);
  }, [username, userEmail, accessToken]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post('/auth/refresh', null, { withCredentials: true });
        console.log('Response:', response);
        console.log('Refresh Token Response:', response.headers['authorization']);

        const newAccessToken = response.headers['authorization'];
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          setUsername(response.data.username);

          const userInfoResponse = await axios.get('/my', {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          setUsername(userInfoResponse.data.userName);
          setUserEmail(userInfoResponse.data.userEmail);
        }
      } catch (error) {
        console.error('Refresh Token Error:', error);
      } finally {
        setIsTokenFetched(true);
      }
    };

    if (!accessToken && !isTokenFetched) {
      fetchAccessToken(); // 조건에 따라 한 번만 실행
    }
  }, [accessToken, isTokenFetched]);


  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, username, setUsername, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
