import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
// import UserList from '../../../components/UserList';

function ChatList() {
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
        {/* <UserList/> */}
      </Box>
    </>
  );
}

export default ChatList;
