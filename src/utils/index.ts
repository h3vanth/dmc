import { FetchArgs, Response } from "../types";

const priceFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

const getInitial = (username: string = "") => {
  return username.charAt(0).toUpperCase();
};

const truncateText = (text: string = "", length: number = 12) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

const formatPrice = (price: number | string) => {
  if (typeof price === "string") {
    price = Number(price);
  }
  return priceFormatter.format(price);
};

const f3tch = async ({ url, method, body, headers, token }: FetchArgs) => {
  const returnValue: Response = {
    data: null,
    okResponse: false,
    hasContent: false,
    headers: null,
  };
  const isFormData = body instanceof FormData;

  try {
    const response = await fetch(import.meta.env.VITE_API_URL + url, {
      method,
      body: body ? (isFormData ? body : JSON.stringify(body)) : null,
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    });

    const responseHeaders = response.headers;
    returnValue.headers = responseHeaders;
    returnValue.okResponse = response.ok;

    const hasContent = responseHeaders.get("Content-Length") !== "0";
    if (hasContent) {
      returnValue.data = await response.json();
      returnValue.hasContent = hasContent;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return returnValue;
  }
};

const joinStringArray = (stringArray: string[], separator: string = ". ") => {
  return stringArray.join(separator);
};

export { getInitial, truncateText, f3tch, joinStringArray, formatPrice };
