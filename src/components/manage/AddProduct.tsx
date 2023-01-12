import * as React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";

import Dialog from "../../base/Dialog";
import TextField from "../../base/TextField";
import { useAppDispatch } from "../../ducks";
import { productActions } from "../../ducks/actions/products";
import { RESET_OPTIONS } from "../../constants/form";
import { AddProductInputs } from "../../types";

const INITIAL_VALUES = {
  productName: "",
  price: 0,
  availableQuantity: 0,
  description: "",
  isAvailable: false,
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
  } = useForm<AddProductInputs>({
    mode: "all",
    defaultValues: INITIAL_VALUES,
  });
  const dispatch = useAppDispatch();

  const onClose = (event: React.SyntheticEvent | {}, clicked: boolean) => {
    if (clicked && isValid) {
      return handleSubmit((data) => {
        const formData = new FormData();
        const {
          productName,
          price,
          availableQuantity,
          description,
          isAvailable,
        } = data;
        formData.append(
          "product",
          JSON.stringify({
            productName,
            price,
            availableQuantity,
            description,
            isAvailable,
          })
        );
        formData.append("file", data.image);

        // TODO: check if passing success cb is ok
        dispatch(
          productActions.addProduct(formData, () => {
            setOpen(false);
            reset(INITIAL_VALUES, RESET_OPTIONS);
          })
        );
      })();
    }
    reset(INITIAL_VALUES, RESET_OPTIONS);
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
            {...register("productName", {
              required: true,
            })}
            error={!!errors.productName}
          />
          <TextField
            label="Available quantity"
            {...register("availableQuantity", {
              required: true,
              pattern: /^\d+$/,
            })}
            error={!!errors.availableQuantity}
          />
          <TextField
            label="Price"
            {...register("price", {
              required: true,
              pattern: /^([0-9]*[.])?[0-9]+$/,
            })}
            error={!!errors.price}
          />
          <TextField label="Description" {...register("description")} />
          <TextField
            label="Upload image"
            InputLabelProps={{
              shrink: true,
            }}
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            {...register("image")}
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
