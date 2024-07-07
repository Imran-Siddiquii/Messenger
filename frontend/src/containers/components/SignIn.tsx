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
import React from 'react';
import { SignInFormType } from '../Auth/types';
import { useDispatch } from 'react-redux';
import { signIn } from '../Auth/slice';

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const [formdata, setFormdata] = React.useState<SignInFormType>({
    name: '',
    phone_number: '',
    password: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    dispatch(signIn({ value: formdata }));
  };
  return (
    <div>
      {' '}
      <Box>
        <TextField
          fullWidth
          label="Name"
          name="name"
          onChange={handleChange}
          value={formdata.name}
        />
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          required
          name="phone_number"
          value={formdata.phone_number}
          onChange={handleChange}
          id="outlined-required"
          label="Number"
        />
        <FormControl
          sx={{ mt: 2, width: 'full-width' }}
          fullWidth
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
            onChange={handleChange}
            value={formdata.password}
            label="Password"
          />
        </FormControl>
        <Button
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export default SignIn;
