const PAGES = [
  {
    page: "Manage products",
    path: "/manage/products",
  },
  // TODO: Feature will be available in future
  // {
  //   page: "Account",
  //   path: "/account",
  // },
  // {
  //   page: "Manage devices",
  //   path: "/manage/devices",
  // },
  {
    page: "Dashboard",
    path: "/",
  },
  {
    page: "Logout",
    path: "/login",
  },
];

const ERRORS = {
  COMMON: "Something went wrong. Please try again",
};

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

enum ALERT_SEVERITY {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export { PAGES, ERRORS, METHOD, ALERT_SEVERITY };
