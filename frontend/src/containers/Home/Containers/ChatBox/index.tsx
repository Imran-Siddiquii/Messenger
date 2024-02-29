import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useSelector } from 'react-redux';
import { selectSelectedChat } from '../ChatList/slice/selector';
import React, { useEffect } from 'react';

const ChatBox = () => {
  const selectChat = useSelector(selectSelectedChat);
  const [chat, setChat] = React.useState<any>();
  useEffect(() => {
    setChat(selectChat);
  }, [selectChat]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '8px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {chat && Object.keys(chat).length > 0 && (
          <div>{chat?.users[1]?.name}</div>
        )}
        {/* You can replace 'User Name' with the actual user's name */}
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '8px' }}>
        {/* Chat messages container */}
        {/* You can map through your chat messages and display them here */}
        {/* Example:
        {chatMessages.map((message, index) => (
          ))}
        */}
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
    </div>
  );
};

export default ChatBox;
