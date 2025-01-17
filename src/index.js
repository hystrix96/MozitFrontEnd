import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import MarketingPage from './marketing-page/MarketingPage';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import Agree from './sign-up/Agree';
import FAQPage from './FAQ-page/FAQPage';
import QuestionPage from './question-page/QuestionPage';
import AboutUs from './aboutus-page/aboutus';
import Edit from './edit-page/EditPage'
import NoticePage from './notice-page/NoticePage';
import NoticeDetailPage from './notice-page/NoticeDetailPage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<MarketingPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/notice/:id" element={<NoticeDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} /> 
      <Route path="/agree" element={<Agree />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/edit" element={<Edit />} />

      
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
