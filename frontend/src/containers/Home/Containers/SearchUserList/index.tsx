import { Box, Grid } from '@mui/material';
import UserList from '../../../components/UserList';
import { useSelector } from 'react-redux';
import {
  selectSearchLoading,
  selectSearchUserData,
} from '../Header/slice/selector';

const SearchUserList = () => {
  const searchUser: any[] = useSelector(selectSearchUserData);
  const loading: boolean = useSelector(selectSearchLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userList = (list: any) => <UserList user={list} key={list._id} />;

  return (
    <Box>
      <Grid
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      ></Grid>
      {searchUser?.length > 0 && searchUser.map(userList)}
    </Box>
  );
};

export default SearchUserList;
