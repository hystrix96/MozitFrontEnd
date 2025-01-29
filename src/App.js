import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicRoutes from './routes/PublicRoute';
import AdminRoutes from './routes/AdminRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Router>
  );
};
export default App;