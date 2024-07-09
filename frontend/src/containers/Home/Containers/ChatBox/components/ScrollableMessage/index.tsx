import { Avatar, Box, Tooltip } from '@mui/material';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../../config';
import { getUser } from '../../../../../../utils';

interface ChatMessagesProps {
  messages: any;
}
const ScrollableMessage: React.FC<ChatMessagesProps> = ({ messages }: any) => {
  const userId = getUser()._id;
  return (
    <ScrollableFeed forceScroll>
      {messages &&
        messages.map((m: any, i: any) => (
          <Box display={'flex'} key={m._id}>
            {isSameSender(messages, m, i, userId) ||
              (isLastMessage(messages, i, userId) && (
                <Tooltip title={m.sender.name} placement="bottom">
                  <Avatar
                    alt="Remy Sharp"
                    src={m.sender.profile_picture}
                    sx={{
                      width: 30,
                      height: 30,
                      border: '1px solid red',
                      cursor: 'pointer',
                      marginTop: isSameUser(messages, m, i) ? '3px' : '10px',
                    }}
                  />
                </Tooltip>
              ))}
            <Box
              component={'span'}
              sx={{
                backgroundColor: `${m.sender._id === userId ? '#e34412' : '#B90'}`,
                marginLeft: isSameSenderMargin(messages, m, i, userId),
                marginTop: isSameUser(messages, m, i) ? '3px' : '10px',
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </Box>
          </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableMessage;
