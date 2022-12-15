import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Dialog from "../../base/Dialog";
import TextField from "../../base/TextField";
import { AppDispatch } from "../../ducks";
import { commonActions } from "../../ducks/actions/common";
import { fetchProducts } from "../../ducks/actions/products";
import { SnackbarData } from "../layout/Snackbar";

type Inputs = {
  productName: string;
  availableQuantity: number;
  price: number;
  isAvailable: boolean;
  description: string | null | undefined;
};

const AddProduct = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      productName: "",
      price: 0,
      availableQuantity: 0,
      description: "",
      isAvailable: false,
    },
  });
  const dispatch: AppDispatch = useDispatch();

  // TODO: Reset fields on close
  const onClose = (e: React.SyntheticEvent | {}, clicked: boolean) => {
    if (clicked && isValid) {
      return handleSubmit((data) => {
        dispatch(commonActions.toggleLoaderState());
        return fetch("http://localhost:8080/api/v1/products", {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          dispatch(commonActions.toggleLoaderState());
          const snackbarData: SnackbarData = {
            message: "Product added",
            severity: "success",
          };
          if (!response.ok) {
            snackbarData.message = "Product addition failed. Please try again.";
            snackbarData.severity = "error";
          } else {
            setOpen(false);
            dispatch(fetchProducts());
          }
          dispatch(commonActions.showSnackbar(snackbarData));
        });
      })();
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={false}
      buttonLabel="Add"
      title="Add product"
    >
      <Box sx={{ minWidth: 300, p: 2 }}>
        <Stack>
          <TextField
            label="Product name"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("productName", {
              required: true,
            })}
            error={!!errors.productName}
          />
          <TextField
            label="Available quantity"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("availableQuantity", {
              required: true,
              pattern: /^\d+$/,
            })}
            error={!!errors.availableQuantity}
          />
          <TextField
            label="Price"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("price", {
              required: true,
              pattern: /^([0-9]*[.])?[0-9]+$/,
            })}
            error={!!errors.price}
          />
          <TextField
            label="Description"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("description")}
          />
          <FormControlLabel
            control={<Switch color="primary" {...register("isAvailable")} />}
            label="Make it available"
            labelPlacement="start"
          />
        </Stack>
      </Box>
    </Dialog>
  );
};

export default AddProduct;
