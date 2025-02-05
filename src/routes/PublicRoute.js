import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import MarketingPage from '../marketing-page/MarketingPage';
import SignIn from '../sign-in/SignIn';
import SignUp from '../sign-up/SignUp';
import Agree from '../sign-up/Agree';
import FAQPage from '../FAQ-page/FAQPage';
import AboutUs from '../aboutus-page/aboutus';
import NoticePage from '../notice-page/NoticePage';
import NoticeDetailPage from '../notice-page/NoticeDetailPage';
import QuestionPage from '../question-page/QuestionPage';
import Edit from '../edit-page/EditPage';
import Live from '../live-page/LivePage';
import Download from '../download-page/DownloadPage';
import MyQuestionPage from '../my-page/MyQuestionPage';
import MyQuestionDetailPage from '../my-page/MyQuestionDetailPage';
import Privacy from '../privacy/Privacy'
import TermOfService from '../term-of-service-page/TermOfServicePage'

import MozaicPage from '../mozaic-page/MozaicPage';
import MyPageUpdate from '../my-page/MyPageUpdate';
import MySubPage from '../my-page/MySubPage';
import MyWorkPage from '../my-page/MyWorkPage';

import ErrorPage from '../error/ErrorPage';
import ServerErrorPage from '../error/ServerErrorPage';
import ErrorBoundary from '../error/ErrorBoundary';

const PublicRoutes = () => {
    const { userId } = useAuth();
    return (
        <ErrorBoundary>
            <Routes>
            {/* Public Routes */}
            <Route path="*" element={<ErrorPage />} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="/" element={<MarketingPage />} />
            <Route path="/agree" element={<Agree />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notice/:id" element={<NoticeDetailPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/termofservicepage" element={<TermOfService />} />
            
            {/* Private Routes */}
            {userId ? (
            <>
                <Route path="/question" element={<QuestionPage />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/live" element={<Live />} />
                <Route path="/download" element={<Download />} />
                <Route path="/myquestion" element={<MyQuestionPage />} />
                <Route path="/myquestion/:id" element={<MyQuestionDetailPage />} />
                <Route path="/mypageupdate" element={<MyPageUpdate />} />
                <Route path="/mysubpage" element={<MySubPage />} />
                <Route path="/myworkpage" element={<MyWorkPage />} />
                <Route path="/mozaic" element={<MozaicPage />} />
                <Route path="*" element={<ErrorPage />} />
            </>
            ) : (
            <>
                <Route path="/question" element={<Navigate to="/sign-in" replace />} />
                <Route path="/edit" element={<Navigate to="/sign-in" replace />} />
                <Route path="/download" element={<Navigate to="/sign-in" replace />} />
                <Route path="/myquestion" element={<Navigate to="/sign-in" replace />} />
                <Route path="/myquestion/:id" element={<Navigate to="/sign-in" replace />} />
                <Route path="/mypageupdate" element={<Navigate to="/sign-in" replace />} />
                <Route path="/mysubpage" element={<Navigate to="/sign-in" replace />} />
                <Route path="/myworkpage" element={<Navigate to="/sign-in" replace />} />
                <Route path="/mozaic" element={<Navigate to="/sign-in" replace />} />
                <Route path="*" element={<ErrorPage />} />
            </>
            )}
            </Routes>
        </ErrorBoundary>
    );
};

export default PublicRoutes;
