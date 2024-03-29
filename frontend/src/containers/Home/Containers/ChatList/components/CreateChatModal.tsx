import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Chip, TextField } from '@mui/material';
import React from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
interface Props {
  handleClose: () => void;
}
interface UserDetails {
  group_name: string;
  users: string[];
}
function CreateChatModal({ handleClose }: Props) {
  const [groupDetails, setGroupDetails] = React.useState<UserDetails>({
    group_name: '',
    users: [],
  });
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event?.target.name, event?.target.value);
  };

  // debouncing method while seach the user
  const onSearch = React.useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        // dispatch(searchUser({ value: event.target.value }));
      }, 300),
    [dispatch],
  );
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
          name="group_name"
          onChange={handleChange}
        />
        <br />
        <TextField
          fullWidth
          sx={{ marginBottom: 1 }}
          id="standard-basic"
          label="Group Name"
          variant="standard"
          placeholder="Add Users e.g: Sunil, Ajay"
          onChange={onSearch}
        />
        <br />
        <Chip
          label="Clickable Deletable"
          variant="outlined"
          onClick={() => console.log('test')}
          onDelete={() => console.log('delete')}
        />
        <Chip
          label="Clickable Deletable"
          variant="outlined"
          onClick={() => console.log('test')}
          onDelete={() => console.log('delete')}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Create Group
        </Button>
      </DialogActions>
    </div>
  );
}

export default CreateChatModal;
