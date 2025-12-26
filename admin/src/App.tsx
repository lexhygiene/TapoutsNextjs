import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';

import ManageBlogs from './pages/ManageBlogs';
import EditBlog from './pages/EditBlog';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router basename={import.meta.env.MODE === 'production' ? '/admin' : '/'}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-blogs"
          element={
            <PrivateRoute>
              <ManageBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
