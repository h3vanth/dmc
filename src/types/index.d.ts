import * as React from "react";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system/createTheme";

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
  fullScreen: boolean;
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
  imageSource?: string;
  alt?: string;
  isAvailable: boolean;
  description?: string | null | undefined;
  availableQuantity: number;
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
  [key: string]: string | number | boolean | null;
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
