import { Box, Button, Drawer, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { searchUser } from '../Home/Containers/Header/slice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { selectSearchValue } from '../Home/Containers/Header/slice/selector';
import SearchUserList from '../Home/Containers/SearchUserList';

interface SearchBarProps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
}
const SearchBar = ({
  openDrawer,
  setOpenDrawer,
}: SearchBarProps) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);

  // debouncing method while seach the user
  const onSearch = React.useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchUser({ value: event.target.value }));
      }, 300),
    [dispatch],
  );

  return (
    <>
      <Button
        size="large"
        variant="outlined"
        startIcon={<SearchIcon />}
        sx={{
          display: { xs:'none', sm: 'flex' },
          fontSize: '15px',
          color: '#ffff',
        }}
        onClick={() => setOpenDrawer(true)}
      >
        Search User
      </Button>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Typography
          variant="h5"
          sx={{
            padding: '10px 20px',
            margin: '1px 20px',
            textAlign: 'center',
          }}
        >
          Search User
        </Typography>
        <Box
          display={'flex'}
          sx={{
            margin: '10px',
          }}
        >
          <TextField
            fullWidth={true}
            size="small"
            placeholder="Search user"
            onChange={onSearch}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        <Box>
          {searchValue && (
            <SearchUserList handleCloseDrawer={() => setOpenDrawer(false)} />
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default SearchBar;
