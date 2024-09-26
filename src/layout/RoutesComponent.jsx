// RoutesComponent.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Adminpage/Dashboard'; // Adjust path to your Dashboard component
import ProjectList from '../pages/Adminpage/ProjectList';
import Manager from '../pages/Adminpage/Manager';
import Employee from '../pages/Adminpage/Employee';
const RoutesComponent = ({ authSelector }) => {
  return (
    <div >

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/project" element={<ProjectList />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  );
};

export default RoutesComponent;
