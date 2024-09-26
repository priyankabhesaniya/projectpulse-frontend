import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Project name is required')
    .min(2, 'Project name must be at least 2 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  startDate: Yup.date()
    .required('Start date is required')
    .nullable(),
  endDate: Yup.date()
    .required('End date is required')
    .nullable()
    .min(Yup.ref('startDate'), 'End date must be after start date'),
  projectType: Yup.string().required('Project type is required'),
  status: Yup.string().required('Status is required'),
});

const AddProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    // You can add your API call here to send data to the server
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Project
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                {...register('startDate')}
                error={!!errors.startDate}
                helperText={errors.startDate ? errors.startDate.message : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                {...register('endDate')}
                error={!!errors.endDate}
                helperText={errors.endDate ? errors.endDate.message : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.projectType}>
                <InputLabel id="project-type-label">Project Type</InputLabel>
                <Select
                  labelId="project-type-label"
                  {...register('projectType')}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Research">Research</MenuItem>
                </Select>
                {errors.projectType && (
                  <div className="error-message">{errors.projectType.message}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  {...register('status')}
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
                {errors.status && (
                  <div className="error-message">{errors.status.message}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Project
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProjectForm;
