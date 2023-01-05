import Stomp from "stompjs";
import store, { AppDispatch } from "../ducks";
import { commonActions } from "../ducks/actions/common";
import { productActions } from "../ducks/actions/products";

// TODO: improve class
class StompClient {
  static client: Stomp.Client;
  static initialized: boolean = false;

  static initialize = () => {
    this.initialized = true;
    this.client = Stomp.over(
      new WebSocket(
        `${import.meta.env.VITE_SOCKET_CONN_URL}?token=${
          store.getState().auth.token
        }`
      )
    );
    if (import.meta.env.PROD) {
      // To not show logs in prod
      this.client.debug = () => {};
    }
    this.client.connect({}, (frame) => {
      const isOnline = store.getState().common.isOnline;
      !isOnline && store.dispatch(commonActions.toggleOnlineStatus());
      this.client.subscribe("/topic/products", (message: Stomp.Message) => {
        (window as any).client = this.client;
        store.dispatch(productActions.setProducts(JSON.parse(message.body)));
      });
    });
  };

  static send = (destination: string) => {
    this.client.send(destination);
  };

  static disconnect = () => {
    this.client.disconnect(() => {
      const isOnline = store.getState().common.isOnline;
      isOnline && store.dispatch(commonActions.toggleOnlineStatus());
    });
  };
}

export default StompClient;
