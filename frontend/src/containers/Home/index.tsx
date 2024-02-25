import Header from './Containers/Header/Loadable';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChatList from './Containers/ChatList/Loadable';
import ChatBox from './Containers/ChatBox/Loadable';
import { useSelector } from 'react-redux';
import { selectSearchValue } from './Containers/Header/slice/selector';
import SearchUserList from './Containers/SearchUserList/Loadable';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 'calc(100vh - 100px)',
  // color: theme.palette.text.secondary,
}));

const Home = () => {
  const searchValue = useSelector(selectSearchValue);
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Item>{!searchValue ? <ChatList /> : <SearchUserList />}</Item>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: { xs: 'none', sm: 'block' } }}
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
