import { Box, Typography } from '@mui/material';

interface Props {
  user: any;
}
const UserList = ({ user }: Props) => {
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
        <Typography variant="h5">{user?.name}</Typography>
        <Typography component="span" fontWeight={600}>
          Number : {user?.phone_number}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserList;
