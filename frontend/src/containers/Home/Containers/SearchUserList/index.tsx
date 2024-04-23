import { Box, CircularProgress, Grid } from '@mui/material';
import UserList from '../../../components/UserList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchLoading,
  selectSearchUserData,
} from '../Header/slice/selector';
import { accessChat } from '../ChatList/slice';

interface SearchUserListProps {
  handleCloseDrawer: (value: boolean) => void;
}
const SearchUserList = ({ handleCloseDrawer }: SearchUserListProps) => {
  const searchUser: any[] = useSelector(selectSearchUserData);
  const loading: boolean = useSelector(selectSearchLoading);
  const dispatch = useDispatch();
  const handleAccessChat = (id: string) => {
    handleCloseDrawer(false);
    dispatch(accessChat({ userId: id }));
  };

  const userList = (list: any) => (
    <UserList handleAccessChat={handleAccessChat} user={list} key={list._id} />
  );

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );

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
