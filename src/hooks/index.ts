import * as React from "react";

import { useAppDispatch, useAppSelector } from "../ducks";
import { commonActions } from "../ducks/actions/common";
import { productActions } from "../ducks/actions/products";
import { SC } from "../helpers";
import { categoriesActionTypes } from "../ducks/actions/categories";

const useSocket = () => {
  const isOnline = useAppSelector((state) => state.common.isOnline);
  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (token) {
      SC.use({
        token,
        subscriptions: [
          {
            destination: `/topic/${userId}/products`,
            cb: (message) =>
              dispatch(productActions.setProducts(JSON.parse(message.body))),
          },
          {
            destination: `/topic/${userId}/categories`,
            cb: (message) =>
              dispatch({
                type: categoriesActionTypes.SET_CATEGORIES,
                payload: JSON.parse(message.body),
              }),
          },
        ],
        afterConn: () =>
          !isOnline && dispatch(commonActions.toggleOnlineStatus()),
      });
    } else {
      SC.diconnect();
    }
  }, [token, isOnline, dispatch]);
};

export { useSocket };
