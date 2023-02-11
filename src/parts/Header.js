import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { LOGOUT } from "../constants/actionTypes";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "store/actions/auth";
import { toastProperties } from "../utils/toastProperties"

const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: LOGOUT });
    dispatch(
      signOut(
        user?.result?.email,
        (res) => {
          toast.success(res?.data?.message, {
            toastProperties
          });
          setUser(null);
          setToken(null);
          history.push("/auth");
        },
        (error) => {
          toast.error(
            error?.response?.data?.message ||
            "You dont have Authorized networks",
            {
              toastProperties
            }
          );
        }
      )
    );
  };
  const login = () => {
    history.push('./auth');
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      setToken(decodedToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src="https://aikerja.com/wp-content/uploads/job-manager-uploads/company_logo/2021/02/AVL_logo-2.png" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 2,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AVL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AVL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <IconButton sx={{ p: 0, mr: 2 }}>
                  {user?.result.user_id ? (
                    <Avatar alt={user?.result.name} src={`https://kalbarvacation.s3.ap-southeast-1.amazonaws.com/user/${user?.result.imageUrl}`} />
                  ) : (
                    <Avatar src={user?.result?.imageUrl} />
                  )}
                </IconButton>
                <LogoutTwoToneIcon onClick={logout}></LogoutTwoToneIcon>
              </>
            ) : (
              <LoginTwoToneIcon onClick={login}></LoginTwoToneIcon>
            )}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
