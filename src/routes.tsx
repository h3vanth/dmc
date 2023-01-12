import { Routes, Route, Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Dashboard from "./components/dashboard";
import Account from "./components/account";
import { useAppSelector } from "./ducks";
import Authenticate from "./components/auth/Authenticate";
import ManageProducts from "./components/manage/ManageProducts";

const InvalidRoute = () => {
  return (
    <Typography variant="h3" color="white">
      Not a valid route!
    </Typography>
  );
};

const AppRoutes = () => {
  const { isAuth, restrictedRoutes = [] } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
    restrictedRoutes: state.common.restrictedRoutes,
  }));

  return (
    <Routes>
      {isAuth && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage/products" element={<ManageProducts />} />
          {!restrictedRoutes.includes("/account") && (
            <>
              {/* TODO: Feature will be available in future */}
              {/* <Route path="/account/" element={<Account />} /> */}
              {/* <Route path="/manage/devices" element={<Account />} /> */}
            </>
          )}
          <Route path="*" element={<InvalidRoute />} />
        </>
      )}
      {!isAuth && (
        <>
          <Route path="/login" element={<Authenticate />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
