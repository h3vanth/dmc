import Stomp from "stompjs";

import { SCExec, SCSubscription, SCUseOptions } from "../types";

const noop = () => {};

class SC {
  static #client: Stomp.Client;
  static #initialized: boolean;
  static #subscriptions: SCSubscription[] = [];
  static #afterConn: () => void = noop;

  static #initialize({ token }: SCUseOptions, execute: SCExec) {
    SC.#initialized = true;
    SC.#client = Stomp.over(
      new WebSocket(`${import.meta.env.VITE_SOCKET_CONN_URL}?token=${token}`)
    );
    if (import.meta.env.PROD) {
      this.#client.debug = noop;
    }
    SC.#connect(execute);
  }

  static #connect(execute: SCExec) {
    SC.#client.connect({}, (frame) => {
      SC.#subscriptions.forEach((s) => {
        SC.#client.subscribe(s.destination, s.cb);
      });
      execute(SC.#client);
      SC.#afterConn();
    });
  }

  static use(
    { token, subscription, afterConn }: SCUseOptions,
    execute: SCExec = noop
  ) {
    if (afterConn != undefined) {
      SC.#afterConn = afterConn;
    }
    if (subscription != undefined) {
      if (
        !SC.#subscriptions.some(
          (s) => s.destination === subscription.destination
        )
      ) {
        SC.#subscriptions.push(subscription);
      }
    }
    if (!SC.#initialized) {
      SC.#initialize({ token }, execute);
    } else if (!SC.#client.connected) {
      SC.#connect(execute);
    } else if (SC.#initialized && SC.#client.connected) {
      execute(SC.#client);
    }
  }
}

export { SC };
