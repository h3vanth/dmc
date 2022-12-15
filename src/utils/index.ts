const getInitial = (username: string = "") => {
  return username.charAt(0).toUpperCase();
};

const truncateText = (text: string = "", length: number = 12) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export { getInitial, truncateText };
