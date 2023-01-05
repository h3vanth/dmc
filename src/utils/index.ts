import { METHOD } from "../constants";
import store from "../ducks";

const getInitial = (username: string = "") => {
  return username.charAt(0).toUpperCase();
};

const truncateText = (text: string = "", length: number = 12) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

const f3tch = async ({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  body?: any;
  headers?: {
    [key: string]: string;
  };
  method: METHOD;
}) => {
  const token = store.getState().auth.token;
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    });
    let data;
    const hasContent = response.headers.get("Content-Length") !== "0";
    if (hasContent) {
      data = await response.json();
    }
    return {
      data,
      okResponse: response.ok,
      hasContent,
      headers: response.headers,
    };
  } catch (err) {
    return {
      okResponse: false,
    };
  }
};

const joinStringArray = (stringArray: string[], separator: string = ". ") => {
  return stringArray.join(separator);
};

export { getInitial, truncateText, f3tch, joinStringArray };
