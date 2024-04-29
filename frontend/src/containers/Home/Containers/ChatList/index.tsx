import { Add } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChatList, selectedChat } from './slice';
import { selectChatList, selectChatListLoading } from './slice/selector';
import UserList from '../../../components/UserList';
import { getUser } from '../../../../utils';
// import UserList from '../../../components/UserList';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CreateChatModal from './components/CreateChatModal';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function ChatList() {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const chatList = useSelector(selectChatList);
  const loading = useSelector(selectChatListLoading);
  // dispatch a fucntion to call api for user list
  React.useEffect(() => {
    dispatch(fetchUserChatList({ value: true }));
  }, [dispatch]);

  const handleAccessChat = (chat: any) => {
    dispatch(selectedChat({ user: chat }));
  };

    const handleClose = () => {
      setOpenModal(false);
    };
  const userList = (list: any) => {
    let check;
    if (list.users[0].id == getUser().id) {
      check = list.users[1];
    } else {
      check = list.users[0];
    }
    return (
      <Box onClick={() => handleAccessChat(list)}>
        <UserList user={check} key={check._id} />
      </Box>
    );
  };

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
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={() => setOpenModal(true)}
          >
            Add Group Chat
          </Button>
        </Grid>
        {chatList?.length > 0 && chatList.map(userList)}
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <CreateChatModal handleClose={handleClose}/>
      </BootstrapDialog>
    </>
  );
}

export default ChatList;
