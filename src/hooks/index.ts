import * as React from "react";

import { useAppSelector } from "../ducks";
import StompClient from "../helpers/StompClient";

export const useSocket = () => {
  const { isAuth } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
  }));

  React.useEffect(() => {
    if (!isAuth || StompClient.initialized) return;
    StompClient.initialize();
  }, [isAuth]);
};
