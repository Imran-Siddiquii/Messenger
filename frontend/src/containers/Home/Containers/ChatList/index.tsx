import { Add } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChatList } from './slice';
import { selectChatList, selectChatListLoading } from './slice/selector';
import UserList from '../../../components/UserList';
// import UserList from '../../../components/UserList';

function ChatList() {
  const dispatch = useDispatch();
  const chatList = useSelector(selectChatList);
  const loading = useSelector(selectChatListLoading);
  console.log('🚀 ~ ChatList ~ loading:', loading);
  // dispatch a fucntion to call api for user list
  React.useEffect(() => {
    dispatch(fetchUserChatList({ value: true }));
  }, [dispatch]);

  const handleAccessChat = (id: string) => {
    // dispatch(accessChat({ userId: id }));
    console.log('🚀 ~ handleAccessChat ~ id:', id);
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
