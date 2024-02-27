import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChatList } from './slice';
import { selectChatList } from './slice/selector';
import UserList from '../../../components/UserList';
// import UserList from '../../../components/UserList';

function ChatList() {
  const dispatch = useDispatch();
  const chatList = useSelector(selectChatList);
  // dispatch a fucntion to call api for user list
  React.useEffect(() => {
    dispatch(fetchUserChatList({ value: true }));
  }, [dispatch]);

  const userList = (list: any) => <UserList user={list} key={list._id} />;

  return (
    <>
      <Box>
        <Grid
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="h5">My Chats</Typography>
          <Button variant="contained" endIcon={<Add />}>
            Add new chat
          </Button>
        </Grid>
        {chatList?.length > 0 && chatList[0].users.map(userList)}
      </Box>
    </>
  );
}

export default ChatList;
