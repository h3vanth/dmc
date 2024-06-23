import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../ducks';
import { commonActions } from '../ducks/actions/common';
import { productActions } from '../ducks/actions/products';
import { SC } from '../helpers';
import { eventActions } from '../ducks/actions/events';
import { authActionTypes } from '../ducks/actions/auth';

const useSocket = () => {
  const online = useAppSelector((state) => state.common.online);
  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (token) {
      SC.use({
        token,
        subscriptions: [
          {
            topic: `/${userId}/products`,
            cb: (message) => {
              dispatch(productActions.adjustProducts(JSON.parse(message.body)));
              dispatch(eventActions.addEvent(JSON.parse(message.body)));
            },
          },
          {
            topic: `/${userId}/categories`,
            cb: (message) => {
              dispatch(productActions.adjustProducts(JSON.parse(message.body)));
              dispatch(eventActions.addEvent(JSON.parse(message.body)));
            },
          },
          {
            topic: `/${userId}/placedOrders`,
            cb: (message) => {
              dispatch(productActions.adjustProducts(JSON.parse(message.body)));
              dispatch(eventActions.addEvent(JSON.parse(message.body)));
            },
          },
          {
            topic: `/${userId}/user-sessions`,
            cb: (message) => {
              const event = JSON.parse(message.body);
              dispatch({
                type: authActionTypes.UPDATE_SESSION_COUNT,
                payload: event.currentSessions,
              });
              if (!['UserSubscribe'].includes(event.type))
                dispatch(eventActions.addEvent(event));
            },
          },
          // TODO: Create client specific topic for sync
        ],
        setOnlineStatus: (online) =>
          dispatch(commonActions.setOnlineStatus(online)),
      });
    } else {
      SC.diconnect();
    }
  }, [token, online, dispatch]);
};

export { useSocket };
