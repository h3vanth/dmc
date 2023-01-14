import { ProductData } from "../types";

const products: ProductData[] = [
  {
    productId: "1",
    productName: "Biryani",
    price: 100,
    isAvailable: true,
    availableQuantity: 100,
    imageUrl: "vite.svg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    productId: "2",
    productName: "Biryani1",
    price: 100,
    isAvailable: true,
    availableQuantity: 100,
    imageUrl: "vite.svg",
    description: "",
  },
  {
    productId: "3",
    productName: "Biryani2",
    price: 100,
    isAvailable: false,
    availableQuantity: 100,
    imageUrl: "vite.svg",
    description: "",
  },
];

export { products };
