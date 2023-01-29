import * as React from "react";

import { useAppDispatch, useAppSelector } from "../ducks";
import { commonActions } from "../ducks/actions/common";
import { productActions } from "../ducks/actions/products";
import { SC } from "../helpers";

const useSocket = () => {
  const { token, isOnline } = useAppSelector((state) => ({
    token: state.auth.token,
    isOnline: state.common.isOnline,
  }));
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (token) {
      SC.use({
        token,
        subscription: {
          destination: "/topic/products",
          cb: (message) =>
            dispatch(productActions.setProducts(JSON.parse(message.body))),
        },
        afterConn: () =>
          !isOnline && dispatch(commonActions.toggleOnlineStatus()),
      });
    }
  }, [token, isOnline, dispatch]);
};

export { useSocket };
