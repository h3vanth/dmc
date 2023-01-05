const email = {
  required: "Enter valid email id",
};

const password = {
  required: "Enter a valid password",
  minLength: {
    value: 8,
    message: "Enter a valid password",
  },
};

export { email, password };
