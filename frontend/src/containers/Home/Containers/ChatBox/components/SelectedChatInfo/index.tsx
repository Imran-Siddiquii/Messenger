import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { SelectedChatInfoProps } from '../../types';
import React from 'react';
import { Clear } from '@mui/icons-material';
const SelectChatInfo: React.FC<SelectedChatInfoProps> = React.memo(
  function SelectedChatInfo({ open, handleClose, selectUserChat }) {
    console.log('render user UI ', selectUserChat);

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Details</DialogTitle>
          <DialogContent>
            <Avatar
              alt="Remy Sharp"
              src="vite.svg"
              sx={{
                width: 190,
                height: 190,
                border: '1px solid red',
                margin: 'auto',
              }}
            />
            <Box display="flex" gap={1}>
              <Typography>Name : {selectUserChat?.chatName}</Typography>
              <Typography>
                Number : {selectUserChat?.users[0]?.phone_number}
              </Typography>
            </Box>
            {selectUserChat?.isGroupChat && (
              <>
                <Divider />
                <TextField
                  label="Search User"
                  size="small"
                  placeholder="Search Users... eg: Ajay"
                  name="search_user"
                  fullWidth
                  onChange={(event) => console.log(event.target.name)}
                  sx={{
                    margin: '10px 0',
                  }}
                />
                <Divider />
                <Typography>Group Members</Typography>
                <Box display={'flex'} gap={2} alignItems={'center'} mt={1}>
                  <Avatar
                    alt="Remy Sharp"
                    src="vite.svg"
                    sx={{
                      width: 36,
                      height: 36,
                      border: '1px solid red',
                    }}
                  />
                  <Box>
                    <Typography fontSize={'0.9rem'}>
                      {selectUserChat.groupAdmin.name}
                    </Typography>
                    <Typography fontSize={'0.7rem'}>
                      {selectUserChat.groupAdmin.phone_number}
                    </Typography>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'flex-end'}
                    width={'100%'}
                    color={'green'}
                    fontSize={'0.9rem'}
                  >
                    <Badge variant="dot" color="success" invisible={false}>
                      Admin
                    </Badge>
                  </Box>
                </Box>
                {selectUserChat &&
                  selectUserChat?.users?.map((userList: any) => (
                    <Box
                      key={userList._id}
                      display={'flex'}
                      gap={2}
                      alignItems={'center'}
                      mt={1}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="vite.svg"
                        sx={{
                          width: 36,
                          height: 36,
                          border: '1px solid red',
                        }}
                      />
                      <Box>
                        <Typography fontSize={'0.9rem'}>
                          {userList.name}
                        </Typography>
                        <Typography fontSize={'0.7rem'}>
                          {userList.phone_number}
                        </Typography>
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'flex-end'}
                        width={'100%'}
                        color={'green'}
                        fontSize={'0.9rem'}
                      >
                        <Button
                          size="small"
                          variant="text"
                          sx={{ justifyContent: 'flex-end', color: 'red' }}
                        >
                          <Clear />
                        </Button>
                      </Box>
                    </Box>
                  ))}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleClose}>Edit</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
);

export default SelectChatInfo;
