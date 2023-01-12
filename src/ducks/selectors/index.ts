const selectToken = (state: { auth: { token: string } }) => state.auth.token;

export { selectToken };
