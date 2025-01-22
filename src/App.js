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
import MyQuestionDetailPage from './my-page/MyQuestionDetailPage';

import MozaicPage from './mozaic-page/MozaicPage';
import MyPageUpdate from './my-page/MyPageUpdate';
import MySubPage from './my-page/MySubPage';
import MyWorkPage from './my-page/MyWorkPage';
import DashBoard from './dashboard/Dashboard'
import ScrollToTop from './ScrollToTop';

import QuestionListPage from './admin-page/QuestionListPage';
import AnswerPage from './admin-page/AnswerPage';
import NoticeListPage from './admin-page/NoticeListPage';
import NoticeUpdatePage from './admin-page/NoticeUpdatePage';
import NoticeEditPage from './admin-page/NoticeEditPage';
import NoticeCreatePage from './admin-page/NoticeCreatePage';
import UserListPage from './admin-page/UserListPage';
import SystemStatus from './admin-page/SystemStatus';
import Traffic from './admin-page/Traffic';
import KPI from './admin-page/KPI';
import AdminEdit from './admin-page/AdminEdit';


const App = () => {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
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
          <Route path="/mypageupdate" element={<MyPageUpdate />} />
          <Route path="/mysubpage" element={<MySubPage />} />
          <Route path="/mysubpage" element={<MySubPage />} />
          <Route path="/myworkpage" element={<MyWorkPage />} />
          <Route path="/mozaic" element={<MozaicPage />} />


          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/system-status" element={<SystemStatus />} />
          <Route path="/admin/traffic" element={<Traffic />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/notice" element={<NoticeListPage />} />
          <Route path="/admin/notice/:id" element={<NoticeUpdatePage />} />
          <Route path="/admin/notice/:id/edit" element={<NoticeEditPage />} />
          <Route path="/admin/notice/create" element={<NoticeCreatePage />} />
          <Route path="/admin/qna" element={<QuestionListPage />} />
          <Route path="/admin/qna/:id" element={<AnswerPage />} />
          <Route path="/admin/kpi" element={<KPI />} />
          <Route path="/admin/admin" element={<AdminEdit />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
