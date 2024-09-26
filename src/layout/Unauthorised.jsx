// UnauthorizeNode.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "../pages/Adminpage/Login"
import SignUp from "../pages/Adminpage/Signup"
const UnauthorizerNode = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default UnauthorizerNode;
