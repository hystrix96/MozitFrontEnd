import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import MarketingPage from './marketing-page/MarketingPage';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import Agree from './sign-up/Agree';
import FAQPage from './FAQ-page/FAQPage';
import QuestionPage from './question-page/QuestionPage';
import AboutUs from './aboutus-page/aboutus';
import Edit from './edit-page/EditPage';
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
import MozaicPage from './mozaic-page/MozaicPage';



const App = () => {
  return (
    <>
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
          <Route path="/mozaic" element={<MozaicPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
