import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('accessToken'));
  const [username, setUsername] = useState(null);
  const [userId, setUserid] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isTokenFetched, setIsTokenFetched] = useState(false);

  // ✅ 토큰 갱신 함수
  const fetchAccessToken = async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh', null, { withCredentials: true });
      const newAccessToken = response.headers['authorization'];

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        sessionStorage.setItem('accessToken', newAccessToken); // ✅ 세션 스토리지에 저장

        // 유저 정보 가져오기
        const userInfoResponse = await axiosInstance.get('/my', {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        setUsername(userInfoResponse.data.userName);
        setUserid(userInfoResponse.data.userId);
        setUserEmail(userInfoResponse.data.userEmail);
      }
    } catch (error) {
      console.error('Refresh Token Error:', error);
      setAccessToken(null);
      setUserid(null);
      setUsername(null);
      setUserEmail(null);
      sessionStorage.removeItem('accessToken'); // ✅ 세션에서 삭제
    } finally {
      setIsTokenFetched(true); // ✅ API 요청 완료
    }
  };

  useEffect(() => {
    if (!isTokenFetched) {
      fetchAccessToken();
    }
  }, [isTokenFetched]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, username, setUsername, userEmail, setUserEmail, userId, setUserid, fetchAccessToken }}>
      {isTokenFetched ? children : null} {/* ✅ 토큰 갱신이 완료되기 전까지 렌더링 방지 */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
