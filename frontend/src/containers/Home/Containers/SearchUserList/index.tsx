import { Box, Grid } from '@mui/material';
import UserList from '../../../components/UserList';
// import SearchBar from '../../../components/SearchBar';

const SearchUserList = () => {
  return (
    <Box>
      <Grid
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {/* <SearchBar/> */}
      </Grid>
      <UserList />
    </Box>
  );
};

export default SearchUserList;
