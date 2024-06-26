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
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { SelectedChatInfoProps } from '../../types';
import React from 'react';
import { Check, Clear, Close } from '@mui/icons-material';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
const SelectChatInfo: React.FC<SelectedChatInfoProps> = React.memo(
  function SelectedChatInfo({ open, handleClose, selectUserChat }) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [renameGroup, setRenameGroup] = React.useState<string>(
      selectUserChat?.chatName,
    );

    const [renameGroupFlag, setRenameGroupFlag] =
      React.useState<boolean>(false);
    setRenameGroupFlag;
    console.log('render user UI ', selectUserChat);
    const handleProfileMenuOpen = (
      event: React.MouseEvent<HTMLElement>,
    ): void => {
      setAnchorEl(event.currentTarget);
    };

    const handleRenameGroup = () => setRenameGroupFlag(true);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleRenameGroup}>Rename</MenuItem>
        <MenuItem
        // onClick={handleMenuClose}
        >
          Delete
        </MenuItem>
      </Menu>
    );

    const handleUpdateGroup = () => {
      if (selectUserChat.chatName.trim() !== renameGroup.trim()) {
        const groupDetails = {
          groupId: selectUserChat._id,
          chatName: renameGroup,
        };
        console.log('🚀 ~ handleUpdateGroup ~ groupDetails:', groupDetails);
        // dispatch(updateGroup({groupDetails}));
        setRenameGroupFlag(false);
      } else {
        console.log('please update gropu name');
      }
    };

    const handleCancel = () => {
      setRenameGroupFlag(false);
      setRenameGroup(selectUserChat?.chatName);
    };
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" display={'flex'}>
            <Box>
              {renameGroupFlag ? (
                <>
                  <FormControl size="small" variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Group name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      endAdornment={
                        <>
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleCancel}
                              edge="end"
                              color="error"
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleUpdateGroup}
                              edge="end"
                              color="success"
                            >
                              <Check fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        </>
                      }
                      name="chatName"
                      value={renameGroup}
                      onChange={(event) => {
                        setRenameGroup(event.target.value);
                        console.log(event.target.value, event.target.name);
                      }}
                      label="Group name"
                    />
                  </FormControl>
                </>
              ) : (
                <Typography variant="h5">
                  {' '}
                  {selectUserChat?.chatName}
                </Typography>
              )}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {selectUserChat?.isGroupChat && (
              <Box>
                <IconButton edge="end" onClick={handleProfileMenuOpen}>
                  <MoreIcon />
                </IconButton>
              </Box>
            )}
          </DialogTitle>
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
            <Divider />
            {selectUserChat?.isGroupChat && (
              <>
                <Divider />
                <TextField
                  label="Search"
                  size="small"
                  placeholder="Search ... eg: Ajay"
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
                        <IconButton
                          size="small"
                          sx={{
                            justifyContent: 'flex-end',
                          }}
                          color="error"
                        >
                          <Clear />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                {renderMenu}
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
