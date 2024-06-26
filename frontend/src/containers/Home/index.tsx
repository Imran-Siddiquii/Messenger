import Header from './Containers/Header/Loadable';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChatList from './Containers/ChatList/Loadable';
import ChatBox from './Containers/ChatBox/Loadable';
import { selectSelectedChat } from './Containers/ChatList/slice/selector';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 'calc(100vh - 100px)',
}));

const Home = () => {
  const selectChat = useSelector(selectSelectedChat);
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: {
                xs: Object.keys(selectChat).length > 0 ? 'none' : 'block',
                sm: 'block',
              },
            }}
          >
            <Item>
              <ChatList />
            </Item>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: {
                xs: Object.keys(selectChat).length > 0 ? 'block' : 'none',
                sm: 'block',
              },
            }}
          >
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
