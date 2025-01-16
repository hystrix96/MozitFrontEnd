import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import MarketingPage from './marketing-page/MarketingPage';
import SignIn from './sign-in/SignIn';
import FAQPage from './FAQ-page/FAQPage';
import QuestionPage from './question-page/QuestionPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<MarketingPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} /> 
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
