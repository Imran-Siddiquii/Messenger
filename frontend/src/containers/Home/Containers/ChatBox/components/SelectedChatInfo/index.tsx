import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { SelectedChatInfoProps } from '../../types';
import React, { memo } from 'react';
const SelectChatInfo: React.FC<SelectedChatInfoProps> = memo(
  function SelectedChatInfo({ open, handleClose }) {
    console.log('render user UI ');

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button autoFocus onClick={handleClose}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
);

export default SelectChatInfo;
