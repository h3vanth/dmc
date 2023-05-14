import Stomp from "stompjs";

import { SCSubscription, SCUseOptions } from "../types";

const noop = () => {};

class SC {
  static #client: Stomp.Client | null;
  static #initialized: boolean;
  static #subscriptions: SCSubscription[] = [];
  static #afterConn: () => void = noop;

  static #initialize({ token }: SCUseOptions) {
    SC.#initialized = true;
    SC.#client = Stomp.over(
      new WebSocket(`${import.meta.env.VITE_SOCKET_CONN_URL}?token=${token}`)
    );
    if (import.meta.env.PROD) {
      this.#client!.debug = noop;
    }
    SC.#connect();
  }

  static #connect() {
    SC.#client?.connect({}, (frame) => {
      SC.#subscriptions.forEach((s) => {
        SC.#client?.subscribe(s.destination, s.cb);
      });
      SC.#afterConn();
    });
  }

  static use({ token, subscriptions, afterConn }: SCUseOptions) {
    if (afterConn != null) {
      SC.#afterConn = afterConn;
    }
    if (subscriptions != null) {
      subscriptions.forEach((subscription) => {
        if (
          !SC.#subscriptions.some(
            (s) => s.destination === subscription.destination
          )
        ) {
          SC.#subscriptions.push(subscription);
        }
      });
    }
    if (!SC.#initialized) {
      SC.#initialize({ token });
    } else if (!SC.#client?.connected) {
      SC.#connect();
    }
  }

  static diconnect() {
    SC.#client?.disconnect(() => {
      console.log("Terminated web socket connection");
      SC.#client = null;
      SC.#initialized = false;
      SC.#subscriptions = [];
      SC.#afterConn = noop;
    });
  }
}

export { SC };
