import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../ducks";
import { getInitial } from "../../utils";
import { account } from "../../mocks/account";
import Avatar from "../common/Avatar";
import { authActions } from "../../ducks/actions/auth";

const pages = [
  {
    page: "Manage products",
    path: "/dmc/manage/products",
  },
  // TODO: Feature will be available in future
  // {
  //   page: "Account",
  //   path: "/dmc/account",
  // },
  // {
  //   page: "Manage devices",
  //   path: "/dmc/manage/devices",
  // },
  {
    page: "Dashboard",
    path: "/dmc/",
  },
  {
    page: "Logout",
    path: "/dmc/login",
  },
];

function AppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const { isAuth, restrictedRoutes = [] } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
    restrictedRoutes: state.common.restrictedRoutes,
  }));
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <MenuBookIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: "auto",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DMC
          </Typography>

          {isAuth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar initials={getInitial(account.username)} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {pages
                  .filter(({ path }) => !restrictedRoutes.includes(path))
                  .map(({ page, path }) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (path === "/dmc/login") {
                          dispatch(authActions.logoutUser());
                        }
                        navigate(path);
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}
export default AppBar;
