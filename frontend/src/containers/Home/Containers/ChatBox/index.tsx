import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedChat } from '../ChatList/slice/selector';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { ArrowBackRounded, VisibilityOutlined } from '@mui/icons-material';
import { makeSelectedChatEmpty } from '../ChatList/slice';

const ChatBox = () => {
  const selectChat = useSelector(selectSelectedChat);
  const dispatch = useDispatch();
  const [chat, setChat] = React.useState<any>();
  useEffect(() => {
    setChat(selectChat);
  }, [selectChat]);

  console.log('🚀 ~ ChatBox ~ selectChat:', selectChat);
  const handleBackClick = () => {
    dispatch(makeSelectedChatEmpty());
  };

  const showSelectChatDetails=()=>{
    console.log('eeeeeeeeeee');
    
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {Object.keys(selectChat).length > 0 ? (
        <>
          {' '}
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '8px',
              borderBottom: '1px solid #ddd',
            }}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Box onClick={handleBackClick}>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={{
                    color: '#ffff',
                    background: '#1976d2',
                    display: { xs: 'flex', sm: 'none' },
                    '&:hover': {
                      color: '#1976d2',
                      background: '#fff',
                    },
                  }}
                >
                  <ArrowBackRounded />
                </IconButton>
              </Box>
              <Box pl={2} pr={2} fontWeight={500} fontSize="1.5rem">
                {chat && Object.keys(chat).length > 0 && (
                  <div>{chat?.users[1]?.name}</div>
                )}
              </Box>
              <Box ml={'auto'} onClick={showSelectChatDetails}>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={{
                    color: '#ffff',
                    background: '#1976d2',
                    '&:hover': {
                      color: '#1976d2',
                      background: '#fff',
                    },
                  }}
                >
                  <VisibilityOutlined />
                </IconButton>
              </Box>
            </Box>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '8px' }}>
            <div style={{ marginBottom: '8px' }}> 'dff'</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderTop: '1px solid #ddd',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Type a message..."
              fullWidth
              sx={{ mr: 1 }}
            />
            <IconButton>
              <InsertEmoticonIcon />
            </IconButton>
            <IconButton>
              <SendIcon />
            </IconButton>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ChatBox;
