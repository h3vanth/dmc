import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";
import Dialog from "../../base/Dialog";
import TextField from "../../base/TextField";
import { useAppDispatch } from "../../ducks";
import { productActions } from "../../ducks/actions/products";
import { RESET_OPTIONS } from "../../constants/form";

export type Inputs = {
  productName: string;
  availableQuantity: number;
  price: number;
  isAvailable: boolean;
  description: string | null | undefined;
  // image: File;
};

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
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: INITIAL_VALUES,
  });
  const dispatch = useAppDispatch();

  const onClose = (event: React.SyntheticEvent | {}, clicked: boolean) => {
    if (clicked && isValid) {
      return handleSubmit((data) => {
        // TODO: check if passing success cb is ok
        dispatch(
          productActions.addProduct(data, () => {
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
          {/* TODO: Future scope - upload image */}
          {/* <TextField
            label="Upload image"
            InputLabelProps={{
              shrink: true,
            }}
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            {...register("image")}
          /> */}
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
