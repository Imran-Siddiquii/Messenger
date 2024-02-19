import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';

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
      </Box>
    </>
  );
}

export default ChatList;
