import { HELPER_TEXT } from "../constants/form";

const email = {
  required: HELPER_TEXT.EMAIL,
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: HELPER_TEXT.EMAIL,
  },
};

const password = {
  required: HELPER_TEXT.PASSWORD,
  minLength: {
    value: 8,
    message: HELPER_TEXT.PASSWORD,
  },
};

const passcode = {
  required: HELPER_TEXT.PASSCODE,
  minLength: {
    value: 6,
    message: HELPER_TEXT.PASSCODE,
  },
  maxLength: {
    value: 6,
    message: HELPER_TEXT.PASSCODE,
  },
};

export { email, password, passcode };
