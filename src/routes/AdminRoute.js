import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import QuestionListPage from '../admin-page/QuestionListPage';
import AnswerPage from '../admin-page/AnswerPage';
import NoticeListPage from '../admin-page/NoticeListPage';
import NoticeUpdatePage from '../admin-page/NoticeUpdatePage';
import NoticeEditPage from '../admin-page/NoticeEditPage';
import NoticeCreatePage from '../admin-page/NoticeCreatePage';
import UserListPage from '../admin-page/UserListPage';
import SystemStatus from '../admin-page/SystemStatus';
import Traffic from '../admin-page/Traffic';
import KPI from '../admin-page/KPI';
import AdminEdit from '../admin-page/AdminEdit'
import DashBoard from '../dashboard/Dashboard'


const AdminRoutes = () => {
    const { userId } = useAuth();

    if (userId !== 'admin') {
        console.log(userId);
        if(userId){
            alert("관리자만 접근 가능합니다.")
            return <Navigate to="/" replace />;
        }
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/system-status" element={<SystemStatus />} />
            <Route path="/traffic" element={<Traffic />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/notice" element={<NoticeListPage />} />
            <Route path="/notice/:id" element={<NoticeUpdatePage />} />
            <Route path="/notice/:id/edit" element={<NoticeEditPage />} />
            <Route path="/notice/create" element={<NoticeCreatePage />} />
            <Route path="/qna" element={<QuestionListPage />} />
            <Route path="/qna/:id" element={<AnswerPage />} />
            <Route path="/kpi" element={<KPI />} />
            <Route path="/admin" element={<AdminEdit />} />
        </Routes>
    );
};

export default AdminRoutes;
