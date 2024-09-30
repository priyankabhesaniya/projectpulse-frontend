import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../../components/DataTable';
import { initialState, FILTER, PAGE_LENGTH } from '../admin-const/constants';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  Typography
} from '@mui/material';

import EmployeeForm from '../../components/EmployeeForm';
import { deleteProject, getAllProject,getOneProject,getTasksByProjectId } from '../../api/Project';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddProjectForm from '../../components/AddProjectForm';
import CheckBadges from '../../components/status/CheckBadges';
import CheckAll from '../../components/DataTable/CheckAll'
import TableTrash from "../../asset/images/table-trash.svg"
import EyeIcon from "../../asset/images/eye-icon.svg"
import moment from 'moment/moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TaskCreateForm from '../../components/TaskCreateForm';

const ProjectTask = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  const [showHeader, setShowHeader] = useState(false);
  const [filter, setFilter] = useState(FILTER)
  console.log("🚀 ~ ProjectTask ~ filter:", filter)
  const [isLoading, setisLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([]);
  const [isShow, setIsShow] = useState(false)
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(null)
  const [mode, setMode] = useState('Add'); // 'add' for adding a new projects
  const [initialValues, setInitialValues] = useState({});
  const [projects, setProjects] = useState([])
  const [totalRecords, settotalRecords] = useState(0)
  
  const handleOpenAdd = (mode) => {
    setMode(mode);
    setOpen(true);
  };

  const { handleSubmit, control, formState: { errors } } = useForm({

  });
const handleAssignManager = (id)=>{

}
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
              <Link onClick={() => {
                setTaskId(row.original?.id)
                setMode('Edit')
                setOpen(true)
              }}>
                {row?.original?.id}
              </Link>
            </div>

          </>
        )
      },
      {
        Header: "Title",
        accessor: "name",
        className: "name-field",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="table-data">

            <p>{row?.original?.title}</p>
          </div>
        ),
      },
      {
        Header: "Discription",
        accessor: "discription",
        className: "text-center status-table",
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
           
             
                {/* {row?.original?.about?.length > 28 ? ( */}
                  <>
                    {/* {row?.original?.about?.slice(0, 28)} */}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip className="custom-tooltip tooltip-top text-start">
                          <p className="mb-0 mt-1">{row?.original?.description}</p>
                        </Tooltip>
                      }
                    >
                      <Link href="#" className="text-capitalize" alt="More" >
                      <img src={EyeIcon} alt="Delete" style={{height:'18px',width:'18px'}}/>
                      </Link>
                    </OverlayTrigger>
                  </>
          
          </>
        ),
      }, 
    //   {
    //     Header: "Created By",
    //     accessor: "created_by",
    //     className: "name-field",
    //     disableSortBy: true,
    //     Cell: ({ row }) => (
    //       <div className="table-data">
    //         {" "}
    //         <p>{row?.original?.created_by?.name}</p>{" "}
    //       </div>
    //     ),
    //   },
    //   {
    //     Header: "Start Date",
    //     accessor: "start_date",
    //     className: "name-field",
    //     disableSortBy: true,
    //     Cell: ({ row }) => (
    //       <div className="table-data">
    //         {" "}
    //         <p>{moment(row?.original?.start_date).format("MM-DD-YYYY")}</p>{" "}
    //       </div>
    //     ),
    //   },
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
    //   {
    //     Header: "Manager",
    //     accessor: "manager",
    //     className: "name-field",
    //     disableSortBy: true,
    //     Cell: ({ row }) => (
        //   <div className="table-data">
        //     {row?.original?.manager?.name}
        //   </div>
    //     ),
    //   },
      {
        Header: "Assigned To",
        accessor: "assigned_to",
        className: "name-field",
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
            <div className="table-data">
            {row?.original?.assigned_to?.name}
          </div>
          </>
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
    //   {
    //     Header: "Tasks",
    //     accessor: "task",
    //     className: "name-field",
    //     disableSortBy: true,
    //     Cell: ({ row }) => (
    //       <>

    //       </>
    //     ),
    //   },

    ],
    [showHeader]
  );
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
        {
          Header: "",
          accessor: "Actions",
          className: "text-center text-nowrap action-w-40",
          width: "100",
          disableSortBy: true,
          Cell: ({ row }) => (
            <>
              {
                <div className="table-data">
                  <div className="d-flex align-items-center justify-content-center table-icon">
                    <Link
                      onClick={() => {

                        removeProjects(row.original.id)

                      }}
                    >
                      <img src={TableTrash} alt="Delete" />
                    </Link>
                  </div>
                </div>
              }
            </>
          ),
        },
      ];

      // Conditionally remove the ID column based on the showHeader state
      if (!showHeader) {
        return visibleColumns.filter((column) => column.id !== "id");
      }
      return visibleColumns;
    });
  };
  const onSubmitSearch = (formData) => {

  }
  const resetSearch = () => {

  }
  const handleCustomSearch = (event) => {
    if (isShow === true) {
      setIsShow(false);
    } else {

      setIsShow(true);
    }
  };
  const fetchTasks = async () => {
    setisLoading(true)
    try {
      const res = await getTasksByProjectId(id,authSelector?.access_token);
      console.log('check check', res);
     
        setProjects(res)
        settotalRecords(res?.length ? res?.length : 0)
        setisLoading(false)
      
    //   if (res?.length > 0) {
    //     console.log('task', res?.task);
        // setProjects(res?.task)
        // settotalRecords(res?.task?.length)
        // setisLoading(false)
    //   }
    //   else {
        // setProjects([])
        // settotalRecords(0)
        // setisLoading(false)
    //   }
    } catch (error) {
      console.error('Error creating user:', error?.message); // Handle error (e.g., show an error message)
    }
    finally {
      setisLoading(false)
    }
  }
  const removeProjects = async (id) => {
    try {
      const res = await deleteProject(id,authSelector?.access_token);
      console.log('User created successfully:', res);

      setTimeout(() => {
        fetchTasks()

      }, 1000);
    } catch (error) {
      console.error('Error creating user:', error?.message); // Handle error (e.g., show an error message)
    }
  }
  useEffect(() => {
    fetchTasks()
  }, []);
  return (
    <>
      <div className="table-wrapper mt-2">
        <div className="table-header filter-action nowrap">
          <h5>Tasks</h5>
          <div className="table-buttons-block">
            {/* <button
                            className={`btn table-action-btn ${isShow ? "active" : ""}`}
                            id="filter-btn"
                            onClick={handleCustomSearch}
                        >
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M3.79733 4.72642C3.89831 4.83633 3.9589 4.98622 3.9589 5.1461V9.69265C3.9589 9.96245 4.29215 10.1023 4.49411 9.91249L5.77659 8.46359C5.94826 8.26374 6.03914 8.16381 6.03914 7.95397V5.1461C6.03914 4.99621 6.09973 4.84633 6.20071 4.72642L9.87648 0.779409C10.1491 0.479636 9.93707 0 9.53313 0H0.464912C0.0609818 0 -0.151081 0.479636 0.121571 0.779409L3.79733 4.72642Z" />
                            </svg>
                            show
                        </button> */}



            <button className="btn round-add-btn"
              onClick={() => handleOpenAdd('Add')}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.26058 4.25626L5.68135 4.24032L5.66014 0.648496C5.62302 0.292501 5.32608 0.0162069 4.97081 0.000266762C4.57842 -0.01036 4.24966 0.297815 4.23905 0.691003L4.26026 4.24032L0.654516 4.2297C0.304546 4.25095 0.0235098 4.53256 0.00229957 4.88324C-0.0295158 5.27643 0.272731 5.6218 0.665121 5.65368L4.26557 5.68024L4.28678 9.2827C4.28678 9.67589 4.61023 10 5.00262 10C5.18821 9.98406 5.35789 9.89904 5.47985 9.76621C5.61242 9.644 5.69726 9.47398 5.70786 9.29332L5.68665 5.68024L9.23938 5.7015C9.43027 5.7015 9.60525 5.63242 9.73782 5.49959C9.89159 5.37738 9.98704 5.19673 9.99764 4.99482C10.0029 4.97888 9.99764 4.96294 9.99764 4.95231C9.98173 4.55381 9.65298 4.24564 9.26058 4.25626Z" />
              </svg>
              Create Task
            </button>
          </div>
        </div>
        {isShow ? (
          <div className={`filter-search-wrapper ${isShow ? "active-filter" : ""}`}>
            <form onSubmit={handleSubmit(onSubmitSearch)} style={{ width: '98%', margin: '0 8px' }}>
              <Grid container spacing={2} alignItems="center">

                {/* State Field */}
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.state} size="small">
                        <InputLabel>State</InputLabel>
                        <Select
                          {...field}
                          label="State"
                          sx={{ height: 40 }}
                        >
                          {/* Uncomment and add options */}
                          {/* {state.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))} */}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Status Field */}
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.status} size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                          {...field}
                          label="Status"
                          sx={{ height: 40 }}
                        >
                          {/* Uncomment and add options */}
                          {/* {SHOW_FILTER_STATUS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))} */}
                        </Select>
                        {errors?.status && (
                          <p className="error-msg">{errors?.status?.message}</p>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Search Button */}
                <Grid item>
                  <Button type="submit" variant="contained" color="primary" sx={{ height: 40, width: 'fit-content' }}>
                    Search
                  </Button>
                </Grid>

                {/* Reset Button */}
                <Grid item>
                  <Button type="reset" variant="outlined" color="secondary" sx={{ height: 40, width: 'fit-content' }} onClick={resetSearch}>
                    Reset
                  </Button>
                </Grid>

              </Grid>
            </form>
          </div>
        ) : null}
        <DataTable
          columns={projectColumn}
          data={projects}
          initialState={initialState}
          setFilter={setFilter}
          totalRecords={totalRecords}
          tableHooks={tableHooks}
          setSelectedRows={setSelectedRows}
          defaultPageLength={PAGE_LENGTH}
          isLoading={isLoading}
          manual={true}
          icontype="clients"
        // checkAll={checkAll}
        />
      </div>

      <TaskCreateForm
        open={open}
        setOpen={setOpen}
        mode={mode}
        taskId={taskId}
        setTaskId={setTaskId}
        fetchTasks={fetchTasks}
      />
    </>
  );
};

export default ProjectTask;
