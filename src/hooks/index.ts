import * as React from "react";

import { useAppSelector } from "../ducks";
import StompClient from "../helpers/StompClient";

const useSocket = () => {
  const { isAuth } = useAppSelector((state) => ({
    isAuth: state.auth.isAuth,
  }));

  React.useEffect(() => {
    if (!isAuth || StompClient.initialized) return;
    StompClient.initialize();
  }, [isAuth]);
};

export { useSocket };
