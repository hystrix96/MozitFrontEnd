import React, { Suspense } from 'react';
import ReactDOM from "react-dom/client";
// import App from './App'; // App.js를 import
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext';
import { useAuth } from './Context/AuthContext';
import { attachAuthInterceptors } from './api/axiosInstance';
import Loader from './components/loader'
const App = React.lazy(() => import('./App')); 

const AccessTokenWrapper = () => {
  const { accessToken, setAccessToken, username, setUsername } = useAuth();
  attachAuthInterceptors(() => accessToken, setAccessToken, setUsername);
  return null; // 별도 렌더링 없이 Context만 설정
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Suspense fallback={<Loader />}>
    <AccessTokenWrapper />
      <App />
    </Suspense>
  </AuthProvider>
);

reportWebVitals();