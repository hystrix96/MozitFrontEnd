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
import MyQuestionPage from './my-page/MyQuestionPage';
import QuestionListPage from './admin-page/QuestionListPage';
import MyQuestionDetailPage from './my-page/MyQuestionDetailPage';
import AnswerPage from './admin-page/AnswerPage';
import NoticeListPage from './admin-page/NoticeListPage';
import NoticeUpdatePage from './admin-page/NoticeUpdatePage';
import NoticeEditPage from './admin-page/NoticeEditPage';
import NoticeCreatePage from './admin-page/NoticeCreatePage';


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
      <Route path="/myquestion" element={<MyQuestionPage />} />
      <Route path="/myquestion/:id" element={<MyQuestionDetailPage />} />
      <Route path="/questionlist" element={<QuestionListPage />} />
      <Route path="/questionlist/:id" element={<AnswerPage />} />
      <Route path="/noticelist" element={<NoticeListPage />} />
      <Route path="/noticelist/:id" element={<NoticeUpdatePage />} />
      <Route path="/noticelist/:id/edit" element={<NoticeEditPage />} />
      <Route path="/noticelist/create" element={<NoticeCreatePage />} />

      
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
