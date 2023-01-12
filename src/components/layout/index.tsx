import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

import AppBar from "./AppBar";
import Snackbar from "./Snackbar";
import { useSocket } from "../../hooks";
import { useAppSelector } from "../../ducks";
import { LayoutProps } from "../../types";

const Layout: React.FC<LayoutProps> = (props) => {
  useSocket();
  const { snackbarData, isLoading } = useAppSelector((state) => ({
    snackbarData: state.common.snackbar,
    isLoading: state.common.isLoading,
  }));

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar />
      <Snackbar
        open={snackbarData.open}
        message={snackbarData.message}
        severity={snackbarData.severity}
      />
      <Container sx={{ mt: 2 }}>{props.children}</Container>
    </>
  );
};

export default Layout;
