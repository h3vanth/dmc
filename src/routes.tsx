import { Routes, Route, Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Dashboard from "./components/dashboard";
import Authenticate from "./components/auth/Authenticate";
import ManageProducts from "./components/manage/ManageProducts";
import { useAppSelector } from "./ducks";

const InvalidRoute = () => {
  return (
    <Typography variant="h3" color="white">
      Not a valid route!
    </Typography>
  );
};

const AppRoutes = () => {
  const { isAuth, allowNavigation } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
    allowNavigation: state.common.allowNavigation,
  }));

  return (
    <Routes>
      {isAuth ? (
        <>
          {allowNavigation ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/manage/products" element={<ManageProducts />} />
              <Route path="*" element={<InvalidRoute />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </>
      ) : (
        <>
          <Route path="/login" element={<Authenticate />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
