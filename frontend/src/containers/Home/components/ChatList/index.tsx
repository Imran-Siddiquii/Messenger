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
        <Box
          mt={4}
          border={'1px solid #d2ebff'}
          borderRadius={'5px'}
          sx={{
            position: 'relative',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Box
            m={1}
            p={1}
            borderRadius={'5px'}
            sx={{
              background: '#d2ebff',
              position: 'relative',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h5">Name</Typography>
            <Typography component="span" fontWeight={600}>
              user name : last message
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ChatList;
