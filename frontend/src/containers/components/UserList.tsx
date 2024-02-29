import { Box, Typography } from '@mui/material';

interface Props {
  handleAccessChat?: (id: string) => void | undefined;
  user: any;
}
const UserList = ({ user, handleAccessChat }: Props) => {
  return (
    <Box
      mt={1}
      border={'1px solid #d2ebff'}
      borderRadius={'5px'}
      sx={{
        position: 'relative',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
      onClick={() => handleAccessChat && handleAccessChat(user._id)}
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
