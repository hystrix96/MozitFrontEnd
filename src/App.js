import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicRoutes from './routes/PublicRoute';
import AdminRoutes from './routes/AdminRoute';
import ScrollToTop from './ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};
export default App;