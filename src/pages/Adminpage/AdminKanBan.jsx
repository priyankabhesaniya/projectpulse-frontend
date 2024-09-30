// import React, { useEffect, useState } from 'react'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import KanBanBoard from '../../components/KanBanBoard';
// import { useLocation, useParams } from 'react-router-dom';
// import { getTasksByProjectId } from '../../api/Project';
// import { useSelector } from 'react-redux';
// const theme = createTheme();

// const AdminKanBan = () => {
//     const authSelector = useSelector(
//         (state) => state.projectpulse.authUserReducer
//       );
//     const {id} = useParams()
//     // const location = useLocation();
//     // const { projectId } = location.state || {}; // Destructure the state object
//     // console.log("🚀 ~ AdminKanBan ~ projectId:", projectId)
//     const [tasks,setTasks] = useState([])
//     console.log("🚀 ~ AdminKanBan ~ tasks:", tasks)
//     const [loading,setisLoading] = useState(false)


//     const fetchTasks = async () => {
//         setisLoading(true);
//         try {
//           const res = await getTasksByProjectId(id, authSelector?.access_token);
//           console.log("check check", res);
    
//           setTasks(res);
//           setisLoading(false);
    
//         } catch (error) {
//           console.error("Error creating user:", error?.message); // Handle error (e.g., show an error message)
//         } finally {
//           setisLoading(false);
//         }
//       };
//       useEffect(() => {
//         fetchTasks()
//       }, [id])
      
//   return (
//     <>
    
//      <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {/* <div className="table-wrapper mt-2">
//       <div className="table-header filter-action nowrap"> */}

//         <h1>Project Kanban Board</h1>
//         <KanBanBoard tasks={tasks} setTasks={setTasks}/>
//       {/* </div>
//       </div> */}
      
//     </ThemeProvider>
//     {/* <div className="table-wrapper mt-2">
//       <div className="table-header filter-action nowrap">
//         <h5>Tasks BOard</h5>
//         <div className="table-buttons-block">

         
//         </div>
//       </div>
     
    
//     </div> */}
//   </>
//   )
// }

// export default AdminKanBan
// AdminKanban.js
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Button, TextField } from '@mui/material';
import KanbanBoard from '../../components/KanBanBoard';
import { useParams } from 'react-router-dom';
import { getTasksByProjectId } from '../../api/Project';
import { useSelector } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#g6g6g6',
    },
  },
});

const AdminKanban = () => {
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer);
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [flag,setFlag] = useState(false)
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await getTasksByProjectId(id, authSelector?.access_token);
      setTasks(res);
    } catch (error) {
      console.error("Error fetching tasks:", error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">Project Kanban Board</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="New column title"
          sx={{ width: 200 }}
        />
        <Button variant="contained" onClick={()=>setFlag(true)}>
          Add Column
        </Button>
      </Box>
        </Box>
        <KanbanBoard tasks={tasks} setTasks={setTasks} loading={loading} setFlag={setFlag} flag={flag}newColumnTitle={newColumnTitle} setNewColumnTitle={setNewColumnTitle}/>
      </Box>
    </ThemeProvider>
  );
};

export default AdminKanban;
