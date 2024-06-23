const PAGES = [
  {
    page: 'Dashboard',
    path: '/',
  },
  {
    page: 'Manage',
    path: '/manage',
  },
  {
    page: 'Logout',
    path: '/login',
  },
  // TODO: Feature will be available in future
  // {
  //   page: "Account",
  //   path: "/account",
  // },
];

const ERRORS = {
  COMMON: 'Something went wrong. Please try again',
};

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

enum ALERT_SEVERITY {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export { PAGES, ERRORS, METHOD, ALERT_SEVERITY };
