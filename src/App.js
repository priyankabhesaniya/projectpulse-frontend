// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Signup from './pages/Signup';
// // import PrivateRoute from './utils/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} /> 
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/dashboard"
//           element={
//             // <PrivateRoute>
//               <Dashboard />
//             // </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.js
import React from 'react';
import Layout from './layout/Layout'; // Adjust the import according to your file structure
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
   <Layout/>
   <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

    </>
  );
};

export default App;
