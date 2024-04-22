import {
  Box,
  Button,
  Drawer,
  // InputBase,
  TextField,
  Typography,
  // alpha,
  // styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { debounce } from 'lodash';
// import { searchUser } from '../Home/Containers/Header/slice';
// import { useDispatch } from 'react-redux';
import React from 'react';
import { ArrowForward } from '@mui/icons-material';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));
const SearchBar = ({
  showSearchBar,
  // setShowSearchBar,
}: {
  showSearchBar: boolean;
  setShowSearchBar: any;
}) => {
  // const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // debouncing method while seach the user
  // const onSearch = React.useMemo(
  //   () =>
  //     debounce((event: React.ChangeEvent<HTMLInputElement>) => {
  //       dispatch(searchUser({ value: event.target.value }));
  //       setShowSearchBar(Boolean(event.target.value));
  //     }, 300),
  //   [dispatch],
  // );
  return (
    <>
      {/* <Search
        sx={{
          display: { xs: showSearchBar ? 'block' : 'none', sm: 'block' },
        }}
        onChange={onSearch}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          // value={searchValue}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search> */}
      <Button
        size="large"
        variant="outlined"
        startIcon={<SearchIcon />}
        sx={{
          display: { xs: showSearchBar ? 'block' : 'none', sm: 'flex' },
          fontSize: '15px',
          color: '#ffff',
        }}
        onClick={toggleDrawer(true)}
      >
        Search User
      </Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {/* {DrawerList} */}
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
            inputProps={{ 'aria-label': 'search' }}
          />
          <Button
            sx={{ marginLeft: '10px' }}
            size="small"
            variant="outlined"
            endIcon={<ArrowForward />}
            // onClick={() => setOpenModal(true)}
          >
            Go
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default SearchBar;
