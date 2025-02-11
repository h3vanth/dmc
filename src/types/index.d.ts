import * as React from "react";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system/createTheme";
import Stomp from "stompjs";

import { ProductAction } from "../constants/products";
import { ALERT_SEVERITY, METHOD } from "../constants";

export interface SnackbarData {
  message: string;
  severity: ALERT_SEVERITY;
}

export interface SnackbarProps extends SnackbarData {
  open: boolean;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: (event: React.SyntheticEvent, clicked: boolean) => void;
}

export interface DialogProps {
  open: boolean;
  onClose: (event: React.SyntheticEvent | {}, clicked: boolean) => void;
  title: string;
  children: React.ReactNode;
  buttonLabel?: string;
  fullScreen?: boolean;
  disableButton?: boolean;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface AvatarProps {
  sx?: SxProps<Theme> | undefined;
  src?: string;
  alt?: string;
  initials?: string;
}

export interface AuthInputs {
  email: string;
  password: string;
  confirmpassword: string;
  passcode: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export interface ProductData {
  productId: string;
  productName: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  description: string;
  availableQuantity: number;
  categories: string[];
}

export interface ProductAddlProps extends ProductData {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductData | null>>;
}

export type ProductActionType = ProductAction;

export interface LayoutProps {
  children: React.ReactNode;
}

export interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  setOpenAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

export interface EditableProductRowProps {
  product: ProductData;
  labelId: string;
  isItemSelected: boolean;
  selected: readonly string[];
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
}

export interface AddProductInputs {
  productName: string;
  availableQuantity: number;
  price: number;
  isAvailable: boolean;
  description: string | null | undefined;
  files: FileList;
}

export type Obj = {
  [key: string]: any;
};

export interface FetchArgs {
  url: string;
  body?: any;
  headers?: {
    [key: string]: string;
  };
  method: METHOD;
  token?: string;
}

export interface Response {
  data: any;
  okResponse: boolean;
  hasContent: boolean;
  headers: Headers | null;
}

export interface Order {
  [productId: string]: {
    quantity: number;
  };
}

export interface PlacedOrder {
  orderId?: string;
  productName: string;
  productId: string;
  quantity: number;
  price: number;
}

export type PlacedOrders = PlacedOrder[];

export interface SCSubscription {
  topic: string;
  cb: (message: Stomp.Message) => void;
}
export interface SCUseOptions {
  token: string;
  subscriptions: SCSubscription[];
  setOnlineStatus: (online: boolean) => void;
}

export interface Event {
  type: string;
  userId: string;
  timestamp: string;
}

export interface ProductCategoryCreatedEvent extends Event {
  categories: string[];
}

export interface ProductCategoryRemovedEvent extends Event, ProductData {
  categoriesBeforeRemoval: string[];
}

export interface OrderPlacedEvent extends Event {
  orderId: string;
  productName: string;
  productId: string;
  quantity: number;
  price: number;
  sessionId: string;
}
