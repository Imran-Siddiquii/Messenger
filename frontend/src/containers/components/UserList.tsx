import { Box, Typography } from '@mui/material';

const UserList = () => {
  return (
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
  );
};

export default UserList;
