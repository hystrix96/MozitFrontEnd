import React, { createContext, useState, useContext , useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isTokenFetched, setIsTokenFetched] = useState(false);

  useEffect(() => {
    console.log(username);
    console.log(accessToken);
  }, [username, accessToken]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post('/auth/refresh', null, { withCredentials: true });
        console.log('Response:', response);
        console.log('Refresh Token Response:', response.headers['authorization']);

        const newAccessToken = response.headers['authorization'];
        if (newAccessToken) {
          setAccessToken(newAccessToken); // Context에 저장
          setUsername(response.data.username);
          console.log('새 액세스 토큰:', newAccessToken);
        }
      } catch (error) {
        console.error('Refresh Token Error:', error);
      } finally {
        setIsTokenFetched(true); // 상태 변경
      }
    };

    if (!accessToken && !isTokenFetched) {
      fetchAccessToken(); // 조건에 따라 한 번만 실행
    }
  }, [accessToken, isTokenFetched]);


  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
