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
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";

import Dialog from "../../base/Dialog";
import TextField from "../../base/TextField";
import Avatar from "../common/Avatar";
import { useAppDispatch, useAppSelector } from "../../ducks";
import { getInitial } from "../../utils";
import { account } from "../../mocks/account";
import { authActions } from "../../ducks/actions/auth";
import { ALERT_SEVERITY, PAGES } from "../../constants";
import { commonActions } from "../../ducks/actions/common";

const AppBar: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const passcodeRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { isAuth, allowNavigation, passcode } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
    allowNavigation: state.common.allowNavigation,
    passcode: state.auth.passcode,
  }));
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleNavControl = () => {
    dispatch(commonActions.toggleNavControl());
  };

  return (
    <>
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
                    <Avatar
                      initials={
                        allowNavigation
                          ? getInitial(account.username)
                          : undefined
                      }
                    />
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
                  {PAGES.filter(({ path }) =>
                    allowNavigation ? true : path === "/"
                  ).map(({ page, path }) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (path === "/login") {
                          dispatch(authActions.destroyStore());
                        }
                        navigate(path);
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
                <Tooltip
                  title={
                    allowNavigation ? "Lock navigation" : "Enable navigation"
                  }
                >
                  <IconButton
                    onClick={() => {
                      if (!allowNavigation) {
                        return setOpenDialog(true);
                      }
                      toggleNavControl();
                      dispatch(
                        commonActions.showSnackbar({
                          severity: ALERT_SEVERITY.INFO,
                          message: "Only dashboard will be accessible now",
                        })
                      );
                    }}
                    sx={{ ml: 2 }}
                  >
                    {allowNavigation ? <LockIcon /> : <LockOpenIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </MuiAppBar>
      <Dialog
        open={openDialog}
        onClose={(_, clicked) => {
          if (!clicked) {
            return setOpenDialog(false);
          }
          if (passcodeRef.current!.value === passcode) {
            setOpenDialog(false);
            toggleNavControl();
          } else {
            passcodeRef.current!.value = "";
          }
        }}
        title="Enter code"
        buttonLabel="Verify"
        fullScreen={false}
      >
        <TextField
          name="passcode"
          inputProps={{
            ref: passcodeRef,
          }}
        />
      </Dialog>
    </>
  );
};
export default AppBar;
