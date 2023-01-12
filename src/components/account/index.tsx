import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

import { getInitial } from "../../utils";
import { commonActions } from "../../ducks/actions/common";
import Avatar from "../common/Avatar";
import { useAppDispatch, useAppSelector } from "../../ducks";
import { ALERT_SEVERITY } from "../../constants";

const Account: React.FC = () => {
  const email = useAppSelector((state) => state.auth.email);
  const dispatch = useAppDispatch();
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
          <Avatar sx={{ width: 50, height: 50 }} initials={getInitial(email)} />
        </Grid>
        <Grid item>
          <Typography color="white">{email}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Lock user from accessing your account">
            <IconButton
              onClick={() => {
                dispatch(
                  commonActions.restrictRoutes(
                    "/account",
                    "/login",
                    "/manage/products"
                    // TODO: Feature will be available in future
                    // "/manage/devices"
                  )
                );
                dispatch(
                  commonActions.showSnackbar({
                    message: "Only dashboard will be accessible now",
                    severity: ALERT_SEVERITY.INFO,
                  })
                );
                navigate("/");
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
