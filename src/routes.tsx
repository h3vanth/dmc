import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Account from "./components/account";
import InvalidRoute from "./components/error/InvalidRoute";
import { useSelector } from "react-redux";
import { RootState } from "./ducks";
import Login from "./components/auth/Login";
import ManageProducts from "./components/manage/ManageProducts";

const AppRoutes = () => {
  const { isAuth, restrictedRoutes = [] } = useSelector((state: RootState) => ({
    isAuth: state.auth.isAuth,
    restrictedRoutes: state.common.restrictedRoutes,
  }));

  return (
    <Routes>
      {isAuth && (
        <>
          <Route path="/dmc/" element={<Dashboard />} />
          {!restrictedRoutes.includes("/dmc/account") && (
            <>
              <Route path="/dmc/account/" element={<Account />} />
              <Route path="/dmc/manage/products" element={<ManageProducts />} />
              {/* TODO: Feature will be available in future */}
              {/* <Route path="/dmc/manage/devices" element={<Account />} /> */}
            </>
          )}
          <Route path="*" element={<InvalidRoute />} />
        </>
      )}
      {!isAuth && (
        <>
          <Route path="/dmc/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/dmc/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
