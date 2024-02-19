import Header from './components/Header/Loadable';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChatList from './components/ChatList/Loadable';
import ChatBox from './components/ChatBox/Loadable';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 'calc(100vh - 100px)',
  // color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <>
      <Header />

      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <ChatList />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <ChatBox />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
