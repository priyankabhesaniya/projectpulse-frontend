// RoutesComponent.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Adminpage/Dashboard'; // Adjust path to your Dashboard component
import DashboardEmployee from '../pages/EmployeePage/Dashboard';
import DashboardManager from '../pages/Managerpage/Dashboard';
import ProjectList from '../pages/Adminpage/ProjectList';
import ProjectListManager from '../pages/Managerpage/ProjectList';
import ProjectListEmployee from '../pages/EmployeePage/ProjectList';
import Manager from '../pages/Adminpage/Manager';
import Employee from '../pages/Adminpage/Employee';
import { useSelector } from 'react-redux';
import ProjectTask from '../pages/Adminpage/ProjectTask';
import AdminKanBan from '../pages/Adminpage/AdminKanBan';
import ProjectDashboard from '../components/ProjectProgress';
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
              <Route path="/project/progress/:id" element={<ProjectDashboard />} />
              <Route path="/project/:id" element={<ProjectTask />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )
        }
        {
              authSelector?.user?.role == "Manager" && (
                <>
    
                  <Route path="/" element={<DashboardManager />} />
                  <Route path="/project" element={<ProjectListManager />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/project/tasks/:id" element={<AdminKanBan />} />
              <Route path="/project/progress/:id" element={<ProjectDashboard />} />
              <Route path="/project/:id" element={<ProjectTask />} />
                  <Route path="*" element={<Navigate to="/" replace />} />

                </>
              )
        }
         {
              authSelector?.user?.role == "Employee" && (
                <>
    
                  <Route path="/" element={<DashboardEmployee />} />
                  <Route path="/project" element={<ProjectListEmployee />} />
                  <Route path="/project/tasks/:id" element={<AdminKanBan />} />
              <Route path="/project/progress/:id" element={<ProjectDashboard />} />
              <Route path="/project/:id" element={<ProjectTask />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )
        }
                  <Route path="/calender" element={<div style={{height:'80vh',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'25px'}}>Under Development</div>} />



      </Routes>
    </div>
  );
};

export default RoutesComponent;
