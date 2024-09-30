// RoutesComponent.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Adminpage/Dashboard'; // Adjust path to your Dashboard component
import ProjectList from '../pages/Adminpage/ProjectList';
import ProjectListManager from '../pages/Managerpage/ProjectList';
import ProjectListEmployee from '../pages/EmployeePage/ProjectList';
import Manager from '../pages/Adminpage/Manager';
import Employee from '../pages/Adminpage/Employee';
import { useSelector } from 'react-redux';
import ProjectTask from '../pages/Adminpage/ProjectTask';
import AdminKanBan from '../pages/Adminpage/AdminKanBan';
const RoutesComponent = () => {
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  console.log("🚀 ~ RoutesComponent ~ authSelector:", authSelector)
  return (
    <div >
      <Routes>
        {
          authSelector?.user?.role == "Admin" && (
            <>

              <Route path="/" element={<Dashboard />} />
              <Route path="/project" element={<ProjectList />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/project/tasks/:id" element={<AdminKanBan />} />
              <Route path="/project/:id" element={<ProjectTask />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )
        }
        {
              authSelector?.user?.role == "Manager" && (
                <>
    
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/project" element={<ProjectListManager />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/project/tasks/:id" element={<AdminKanBan />} />
                  <Route path="/project/:id" element={<ProjectTask />} />
                  <Route path="*" element={<Navigate to="/" replace />} />

                </>
              )
        }
         {
              authSelector?.user?.role == "Employee" && (
                <>
    
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/project" element={<ProjectListEmployee />} />
                  {/* <Route path="/employee" element={<Employee />} /> */}
                  <Route path="/project/tasks/:id" element={<AdminKanBan />} />
                  <Route path="/project/:id" element={<ProjectTask />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )
        }
                  <Route path="/calender" element={<h1>Under Development</h1>} />



      </Routes>
    </div>
  );
};

export default RoutesComponent;
