import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getInitial } from "../../utils";
import { account } from "../../mocks/account";
import { commonActions } from "../../ducks/actions/common";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 5 }}>
      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Grid item>
          <Avatar sx={{ width: 50, height: 50 }}>
            {getInitial(account.username)}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography color="white">{account.username}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Lock user from accessing your account">
            <IconButton
              onClick={() => {
                dispatch(
                  commonActions.restrictRoutes(
                    "/dmc/account",
                    "/dmc/login",
                    "/dmc/manage/products"
                    // TODO: Feature will be available in future
                    // "/dmc/manage/devices"
                  )
                );
                dispatch(
                  commonActions.showSnackbar({
                    message: "Only dashboard will be accessible now",
                    severity: "info",
                  })
                );
                navigate("/dmc/");
              }}
            >
              <LockIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Button>Reset password</Button>
    </Box>
  );
};

export default Account;
