import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App'; // App.js를 import
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext';
import { useAuth } from './Context/AuthContext';
import { attachAuthInterceptors } from './api/axiosInstance';

const AccessTokenWrapper = () => {
  const { accessToken, setAccessToken, username, setUsername, userEmail, setUserEmail } = useAuth();
  attachAuthInterceptors(() => accessToken, setAccessToken, setUsername, userEmail, setUserEmail); // Axios에 Access Token 전달
  return null; // 별도 렌더링 없이 Context만 설정
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <AccessTokenWrapper />
      <App />
  </AuthProvider>
);

reportWebVitals();
