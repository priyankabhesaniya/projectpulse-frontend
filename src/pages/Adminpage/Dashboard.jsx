import React, { useEffect, useState,useMemo } from 'react';
import { getProjects, getTasks, getNotifications } from '../../api/Dashboard'; // Adjust the path as needed
// import Charts from './Charts'; // Your chart component
import NotificationList from './NotificationList'; // Your notification list component
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddProjectForm from '../../components/AddProjectForm';
import { useSelector } from 'react-redux';
import { getManagersPair } from '../../api/Manager';
import { getEmployeePair } from '../../api/Employe';
import DataTable from '../../components/DataTable';
import PreviewIcon from '@mui/icons-material/Preview';
import { initialState, FILTER, PAGE_LENGTH, statusOptions } from '../admin-const/constants';
import CheckBadges from '../../components/status/CheckBadges';
import CheckAll from '../../components/DataTable/CheckAll'
import TableTrash from "../../asset/images/table-trash.svg"
import EyeIcon from "../../asset/images/eye-icon.svg"
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

const Dashboard = () => {
  const navigate = useNavigate()
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  const [projects, setProjects] = useState([]);
  const [showHeader, setShowHeader] = useState(false);
  const [filter, setFilter] = useState(FILTER)
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalRecords, settotalRecords] = useState(0)
  const [employee, setEmployee] = useState([]);
  const [manager, setManager] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility
  const projectColumn = useMemo(
    () => [
      {
        Header: "Code",
        accessor: "id_f",
        className: "text-center",
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
            <div className="table-data">
              <p onClick={() => {
                // setProjectId(row.original?.id)
                // setMode('Edit')
                // setOpen(true)
              }}>
                {row?.original?.id}
              </p>
            </div>

          </>
        )
      },
      {
        Header: "Name",
        accessor: "name",
        className: "name-field",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="table-data">

            <p>{row?.original?.name}</p>
          </div>
        ),
      },
      {
        Header: "Created By",
        accessor: "created_by",
        className: "name-field",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="table-data">
            {" "}
            <p>{row?.original?.created_by?.name}</p>{" "}
          </div>
        ),
      },
      {
        Header: "Start Date",
        accessor: "start_date",
        className: "name-field",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="table-data">
            {" "}
            <p>{moment(row?.original?.start_date).format("MM-DD-YYYY")}</p>{" "}
          </div>
        ),
      },
      {
        Header: "Deadline Date",
        accessor: "deadline_date",
        className: "name-field",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="table-data">
            {" "}
            <p>{moment(row?.original?.deadline_date).format("MM-DD-YYYY")}</p>{" "}
          </div>
        ),
      },
      {
        Header: "Tasks",
        accessor: "tasks",
        className: "text-center name-field cursor-pointer",
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
            <div className="table-data" onClick={() => navigate(`/project/${row?.original?.id}`)}>
              <img src={EyeIcon} alt="" className="cursor-pointer" style={{ cursor: "pointer" }} />
            </div>
          </>
        ),
      },      
      {
        Header: "Kanban",
        accessor: "kanban",
        className: "text-center name-field cursor-pointer",
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
           <div className="table-data" onClick={()=>navigate(`/project/tasks/${row?.original?.id}`)}>
            <img src={EyeIcon} alt="" style={{ cursor: "pointer" }}/>
          </div>
          </>
        ),
      },     
      {
        Header: "Progress",
        accessor: "manager",
        className: "text-center name-field cursor-pointer",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="table-data" onClick={()=>navigate(`/project/progress/${row?.original?.id}`)}>
            <img src={EyeIcon} alt="" style={{ cursor: "pointer" }}/>
          </div>
        ),
      },
       
      {
        Header: "Status",
        accessor: "status",
        className: "text-center status-table",
        disableSortBy: true,
        Cell: ({ row }) =>
        (
          <>
            <CheckBadges status={row?.original?.status} />
          </>
        ),
      },
     

    ],
    [showHeader]
  );
  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProjects(authSelector?.access_token);
      setProjects(projectsData ? projectsData : [])
      settotalRecords(projectsData?.length ? projectsData?.length : 0)
      const managerData = await getManagersPair(authSelector?.access_token)
      setManager(managerData)
      const employeeData = await getEmployeePair(authSelector?.access_token)
      setEmployee(employeeData)
      // const tasksData = await getTasks();
      // const notificationsData = await getNotifications();

      // setProjects(projectsData);
      // setTasks(tasksData);
      // setNotifications(notificationsData);
    };

    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => {
      const visibleColumns = [
        {
          id: "id",
          className: "action-w-40",
          disableSortBy: true,
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <CheckAll {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <CheckAll {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
     
      ];

      // Conditionally remove the ID column based on the showHeader state
      if (!showHeader) {
        return visibleColumns.filter((column) => column.id !== "id");
      }
      return visibleColumns;
    });
  };

  return (
    <div className="dashboard" style={{ padding: '0 20px' }}>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      {/* Overview Section */}
      <hr />
      <Typography variant="h5" gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{backgroundColor:'#3bb53724'}}>
            <CardContent>
              <Typography variant="h6">Total Projects</Typography>
              <Typography variant="h4">{projects?.length ? projects?.length : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{backgroundColor:'#a324991a'}}>
            <CardContent>
              <Typography variant="h6">Total Managers</Typography>
              <Typography variant="h4">{manager?.length ? manager?.length : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{backgroundColor:'#fc5d201a'}}>
            <CardContent>
              <Typography variant="h6">Total Employees</Typography>
              <Typography variant="h4">{employee?.length ? employee?.length : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions Section */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Quick Access
      </Typography>
      <div>
        <Button variant="contained" color="primary" style={{ margin: '5px' }} onClick={()=>setOpen(true)}>
          Add Project
        </Button>
       
       
      </div>

      {/* Charts Section */}
      {/* <Charts projects={projects} tasks={tasks} /> */}
      <div className="table-wrapper mt-2">
        <div className="table-header filter-action nowrap">
          <h5>Projects</h5>
          
        </div>
     
        <DataTable
          columns={projectColumn}
          data={projects}
          initialState={initialState}
          setFilter={setFilter}
          totalRecords={totalRecords}
          tableHooks={tableHooks}
          setSelectedRows={setSelectedRows}
          // defaultPageLength={PAGE_LENGTH}
          isLoading={isLoading}
          manual={true}
          defaultPageLength={false}
          searchField={false}
          paginationSearch={false}
          viewAll={true}
          viewAllLink={"/project"}
          icontype="clients"
        // checkAll={checkAll}
        />
      </div>
      {/* Notifications Section */}
      {/* <div className="notifications" style={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Recent Notifications
        </Typography>
        <NotificationList notifications={notifications} />
      </div> */}
        {/* Modal for Adding Project */}
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <AddProjectForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <AddProjectForm
        open={open}
        setOpen={setOpen}
        mode={"Add"}
        projectId={null}
        // setProjectId={setProjectId}
        // fetchProjects={fetchProjects}
      />
    </div>
  );
};

export default Dashboard;
