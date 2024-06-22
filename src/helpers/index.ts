import Stomp from "stompjs";

import { SCSubscription, SCUseOptions } from "../types";

const noop = () => {};

class SC {
  static #connecting = false;
  static #disconnecting = false;
  static #client: Stomp.Client | null;
  static #initialized: boolean;
  static #subscriptions: SCSubscription[] = [];
  static #setOnlineStatus: (online: boolean) => void;

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
    if (SC.#connecting) return;

    SC.#connecting = true;
    SC.#client?.connect(
      {},
      (frame) => {
        SC.#subscriptions.forEach((s) => {
          SC.#client?.subscribe(s.topic, s.cb);
        });
        SC.#connecting = false;
        SC.#setOnlineStatus(true);
      },
      (error) => {
        // TODO: Implement retry
        SC.#connecting = false;
        SC.#setOnlineStatus(false);
      }
    );
  }

  static use(scOptions: SCUseOptions) {
    const { subscriptions, setOnlineStatus } = scOptions;
    if (setOnlineStatus != null) {
      SC.#setOnlineStatus = setOnlineStatus;
    }
    if (subscriptions != null) {
      subscriptions.forEach((subscription) => {
        if (!SC.#subscriptions.some((s) => s.topic === subscription.topic)) {
          SC.#subscriptions.push(subscription);
        }
      });
    }
    if (!SC.#initialized) {
      SC.#initialize(scOptions);
    } else if (!SC.#client?.connected) {
      SC.#connect();
    }
  }

  static diconnect() {
    if (SC.#disconnecting || !SC.#client?.connected) return;

    SC.#disconnecting = true;
    SC.#client?.disconnect(() => {
      SC.#client = null;
      SC.#initialized = false;
      SC.#disconnecting = true;
      SC.#subscriptions = [];
      SC.#setOnlineStatus(false);
    });
  }
}

export { SC };
