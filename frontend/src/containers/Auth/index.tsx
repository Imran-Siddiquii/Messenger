import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  AppBar,
  Tabs,
  Typography,
  Box,
  Tab,
  Container,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TabPanelProps } from './types';
import { useSelector } from 'react-redux';
import { selectUserToken } from './slice/selector';
import { useNavigate } from 'react-router-dom';

const LaodableLogin = React.lazy(() => import('../components/Login'));
const LaodableSignIn = React.lazy(() => import('../components/SignIn'));

const Login = () => (
  <React.Suspense fallback={<>Loading ....</>}>
    <LaodableLogin />
  </React.Suspense>
);
const SignIn = () => (
  <React.Suspense fallback={<>Loading ....</>}>
    <LaodableSignIn />
  </React.Suspense>
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Auth() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const userToken = useSelector(selectUserToken);
  React.useEffect(() => {
    if (userToken) {
      navigate('/');
    }
  }, [userToken]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '60vh' }}
      >
        <Grid item xs={12} width="600px">
          <Box
            sx={{
              bgcolor: 'background.paper',
              // width: '100%', // Allow the box to take full width
              maxWidth: '500px', // Set a maximum width
              border: '1px solid #ccc',
              padding: 3,
              borderRadius: 4,

              [theme.breakpoints.down('sm')]: {
                maxWidth: '60%', // Full width for small screens
              },
            }}
          >
            <Box
              justifyContent="center"
              mb="20px"
              fontSize="2rem"
              textAlign="center"
            >
              Messanger
            </Box>
            <AppBar
              position="relative"
              sx={{
                borderRadius: '10px',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                // indicatorColor="none"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Sign In" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Login />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <SignIn />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Auth;
