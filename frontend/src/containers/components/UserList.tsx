import { Box, Typography } from '@mui/material';
import { getUser } from '../../utils';

interface Props {
  handleAccessChat?: (id: string) => void | undefined;
  user: any;
}
const UserList = ({ user, handleAccessChat }: Props) => {
  const getUserList = (list: any) => {
    console.log("🚀 ~ getUserList ~ list:", list)
    
    if (list?.users[0].id == getUser().id) {
      return (
        <>
          <Typography variant="h5">{user.users[1]?.name}</Typography>
          <Typography component="span" fontWeight={600}>
            Number : {list.users[1]?.phone_number}
          </Typography>
        </>
      );
    }
    return (
      <>
        <Typography variant="h5">{user.users[1]?.name}</Typography>
        <Typography component="span" fontWeight={600}>
          Number : {list.users[1]?.phone_number}
        </Typography>
      </>
    );
  };

  console.log('username', user);
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
        {!user.isGroupChat ? (
          getUserList(user)
        ) : (
          <Typography component="span" fontWeight={600}>
            {user?.chat}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserList;
