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
      SC.use(
        {
          token,
        },
        (client) => {
          !isOnline && dispatch(commonActions.toggleOnlineStatus());
          client.subscribe("/topic/products", (message: any) => {
            dispatch(productActions.setProducts(JSON.parse(message.body)));
          });
        }
      );
    }
  }, [token, isOnline, dispatch]);
};

export { useSocket };
