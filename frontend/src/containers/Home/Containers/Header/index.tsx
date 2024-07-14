import * as React from 'react';
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  MenuList,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ProfileModal from './ProfileModal';
import SearchBar from '../../../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotification } from './slice/selector';
import { getSender, getUser } from '../../../../utils';
import { setNotification } from './slice';
import { selectedChat } from '../ChatList/slice';

function Header() {
  const notification = useSelector(selectNotification);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profileModal, setProfileModal] = React.useState<boolean>(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const [anchorElNotification, setAnchorElNotification] =
    React.useState<null | HTMLElement>(null);
  const openNotification = Boolean(anchorElNotification);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleNoticationClose = () => {
    setAnchorElNotification(null);
  };

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // handle profile modal close
  const handleProfileModal = () => setProfileModal(true);
  const handleModalClose = () => setProfileModal(false);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileModal}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderNotification = (
    <Menu
      anchorEl={anchorElNotification}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary notication id"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openNotification}
      onClose={handleNoticationClose}
    >
      <MenuList sx={{ padding: '10px' }}>
        {!notification.length && 'No New Messages'}
        {notification.map((notif: any) => (
          <MenuItem
            key={notif._id}
            onClick={() => {
              dispatch(selectedChat({ user: notif.chat }));
              dispatch(
                setNotification({
                  newNotification: notification.filter((n: any) => n !== notif),
                }),
              );
            }}
          >
            {notif.chat.isGroupChat
              ? `New Message in ${notif.chat.chatName}`
              : `New Message from ${getSender(getUser(), notif.chat.users)}`}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SearchBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
          <Box onClick={() => setOpenDrawer(true)}>
            <IconButton
              sx={{
                color: '#fff',
                paddingTop: '14px',
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" noWrap component="div">
            Messenger
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              id="basic-button"
              aria-controls={openNotification ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openNotification ? 'true' : undefined}
              onClick={handleClick}
            >
              <Badge badgeContent={notification.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotification}
      <ProfileModal open={profileModal} handleClose={handleModalClose} />
    </Box>
  );
}
export default Header;
