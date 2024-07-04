import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Chip, List, ListItem, TextField } from '@mui/material';
import React from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser, searchUserEmpty } from '../../Header/slice';
import {
  selectSearchUserData,
  selectSearchValue,
} from '../../Header/slice/selector';
import { createGroupChat } from '../slice';
interface Props {
  handleClose: () => void;
}
interface UserDetails {
  name: string;
  users: string[];
}
function CreateChatModal({ handleClose }: Props) {
  const [groupDetails, setGroupDetails] = React.useState<UserDetails>({
    name: '',
    users: [],
  });
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  const searchedUser = useSelector(selectSearchUserData);

  React.useEffect(() => {
    dispatch(searchUserEmpty(''));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setGroupDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  // debouncing method while seach the user
  const onSearch = React.useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchUser({ value: event.target.value }));
      }, 300),

    [dispatch],
  );

  const handleClickList = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    list: any,
  ) => {
    event.preventDefault();
    setGroupDetails((prev) => {
      // Check if the list already exists in the users array
      if (!prev.users.some((user: any) => user?._id === list._id)) {
        // If not, add the list to the users array
        return {
          ...prev,
          users: [...prev.users, list],
        };
      }
      // If the list already exists, return the previous state
      return prev;
    });
  };

  const handleCreateGroup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    dispatch(
      createGroupChat({
        value: {
          name: groupDetails.name,
          users: groupDetails.users.map((userList: any) => userList._id),
        },
      }),
    );
  };
  return (
    <div>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create Group Chat
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TextField
          sx={{ marginBottom: 1 }}
          fullWidth
          id="standard-basic"
          label="Group Name"
          variant="standard"
          name="name"
          onChange={handleChange}
        />
        <br />
        <TextField
          fullWidth
          sx={{ marginBottom: 1 }}
          id="standard-basic"
          label="Search user"
          variant="standard"
          placeholder="Add Users e.g: Sunil, Ajay"
          onChange={onSearch}
        />
        <br />
        {groupDetails.users.map((selectedUserList) => (
          <Chip
            label={selectedUserList?.name}
            variant="outlined"
            onClick={() => console.log('test')}
            onDelete={() => console.log('delete')}
          />
        ))}
        <List>
          {searchValue &&
            searchedUser.map((list: any) => (
              <ListItem onClick={(event) => handleClickList(event, list)}>
                {list.name}
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleCreateGroup(event)
          }
        >
          Create Group
        </Button>
      </DialogActions>
    </div>
  );
}

export default CreateChatModal;
