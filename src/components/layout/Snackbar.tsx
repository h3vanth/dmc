import * as React from "react";
import Stack from "@mui/material/Stack";
import MuiSnackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { commonActions } from "../../ducks/actions/common";
import { useAppDispatch } from "../../ducks";

export interface SnackbarData {
  message: string;
  severity: "error" | "warning" | "info" | "success";
}

export interface SnackbarProps extends SnackbarData {
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar: React.FC<SnackbarProps> = ({ open, message, severity }) => {
  const dispatch = useAppDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(commonActions.hideSnackbar());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <MuiSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MuiSnackbar>
    </Stack>
  );
};

export default Snackbar;
