import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { ChangeEvent } from 'react';
import { LoginFormType } from '../Auth/types';
import { useDispatch } from 'react-redux';
import { login } from '../Auth/slice';

const Login = () => {
  const dispatch = useDispatch();
  const [formdata, setFormdata] = React.useState<LoginFormType>({
    phone_number: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // toggle password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  //onChange
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormdata((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(login({ value: formdata }));
  };
  return (
    <Box>
      <TextField
        fullWidth
        required
        id="outlined-required"
        name="phone_number"
        value={formdata.phone_number}
        onChange={handleChange}
        label="Number"
      />
      <FormControl
        sx={{ mt: 2, width: 'full-width' }}
        fullWidth
        variant="outlined"
        required
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          name="password"
          value={formdata.password}
          onChange={handleChange}
          label="Password"
        />
      </FormControl>
      <Button
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
