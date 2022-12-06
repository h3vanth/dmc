import * as React from "react";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "./AppBar";
import Snackbar, { SnackbarProps } from "./Snackbar";
import Product from "../dashboard/Product";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    snackbarData,
    isLoading,
  }: { snackbarData: SnackbarProps; isLoading: boolean } = useSelector(
    (state: any) => ({
      snackbarData: state.common.snackbar,
      isLoading: state.common.isLoading,
    })
  );
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
      {props.children}
    </>
  );
};

export default Layout;
