import React from 'react';
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
import { loginUSer } from '../../api/Login';
import { addAuthData } from '../../store/slices/authUser/authUserSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Yup validation schema
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  role: yup.string().required('Role is required')
});

const Login = () => {
  const dispatch = useDispatch()
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
   
    try {
        const userData = {
            email: data.email,
            password: data.password,
            role: data.role,
        };

        const res = await loginUSer(userData);
        console.log('User created successfully:', res); 
        dispatch(
          addAuthData({
            loading: false,
            auth: true,
            success: true,
            access_token: res.token,
            token_type: "Bearer",
            user: res?.user,
            profile: res?.profile,
            user_permissions: res?.permission
          })
        )
    } catch (error) {
        console.error('Error creating user:', error.message); // Handle error (e.g., show an error message)
    }
};
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
        
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '600px' }}>
      <Typography variant="h6" style={{ flexGrow: 0.1,marginBottom:10 }}>
          <div className="fancy-text">
            Project<span className="highlight">Pulse</span>
          </div>
        </Typography>
        <Grid container spacing={2} justifyContent="center">

          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
          </Grid>

          {/* Password Field */}
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
          </Grid>

          {/* Role Dropdown */}
          <Grid item xs={12}>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select {...field} label="Role">
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                  </Select>
                  {errors.role && <p className='error-msg'>{errors.role.message}</p>}
                </FormControl>
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
          <p>Don't have account? <Link to="/signup">SignUp here</Link></p>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
