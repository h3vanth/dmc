import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "../../base/TextField";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Checkbox from "@mui/material/Checkbox";
import DoneIcon from "@mui/icons-material/Done";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";

import { ProductData } from "../dashboard/Product";
import { productActions } from "../../ducks/actions/products";
import { useAppDispatch } from "../../ducks";

export type Inputs = {
  [key: string]: string | number | boolean | null;
};

interface EditableProductRowProps {
  product: ProductData;
  labelId: string;
  isItemSelected: boolean;
  selected: readonly string[];
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
}

// TODO: Future scope - can update image, description
const EditableProductRow: React.FC<EditableProductRowProps> = (props) => {
  const {
    product,
    product: { productId, productName, availableQuantity, price, isAvailable },
    labelId,
    isItemSelected,
    selected,
    setSelected,
  } = props;
  const dispatch = useAppDispatch();
  const [inEditMode, setInEditMode] = React.useState(false);
  const [available, setAvailable] = React.useState(isAvailable);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<Inputs>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      [`productName_${productId}`]: productName,
      [`availableQuantity_${productId}`]: availableQuantity,
      [`price_${productId}`]: price,
    },
  });
  const quantity = watch(`availableQuantity_${productId}`);

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const submit = () => {
    handleSubmit((data) => {
      const payload: Inputs = { ...product };
      for (const key in data) {
        payload[key.split("_")[0]] = data[key];
      }
      payload["isAvailable"] = available;
      if (
        payload.productName != productName ||
        payload.price != price ||
        payload.availableQuantity != availableQuantity ||
        payload.isAvailable != isAvailable
      )
        // TODO: check if passing success cb is ok
        return dispatch(
          productActions.updateProduct(payload, () => setInEditMode(false))
        );
      setInEditMode(false);
    })();
  };

  React.useEffect(() => {
    const { productId, productName, availableQuantity, price, isAvailable } =
      product;
    reset({
      [`productName_${productId}`]: productName,
      [`availableQuantity_${productId}`]: availableQuantity,
      [`price_${productId}`]: price,
    });
    setAvailable(isAvailable);
  }, [product]);

  React.useEffect(() => {
    if (!quantity || isNaN(quantity as number) || Number(quantity) === 0) {
      setAvailable(false);
    }
  }, [quantity]);

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, productId)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={productId}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell id={labelId}>
        <TextField
          onClick={(event) => {
            event.stopPropagation();
          }}
          disabled={!inEditMode}
          {...register(`productName_${productId}`, {
            required: true,
          })}
          error={!!errors?.[`productName_${productId}`]}
        />
      </TableCell>
      <TableCell>
        <TextField
          onClick={(event) => {
            event.stopPropagation();
          }}
          disabled={!inEditMode}
          {...register(`availableQuantity_${productId}`, {
            required: true,
            pattern: /^\d+$/,
          })}
          error={!!errors?.[`availableQuantity_${productId}`]}
        />
      </TableCell>
      <TableCell>
        <TextField
          onClick={(event) => {
            event.stopPropagation();
          }}
          disabled={!inEditMode}
          {...register(`price_${productId}`, {
            required: true,
            pattern: /^([0-9]*[.])?[0-9]+$/,
          })}
          error={!!errors?.[`price_${productId}`]}
        />
      </TableCell>
      <TableCell align="center">
        {inEditMode ? (
          <Switch
            color="success"
            checked={available}
            onChange={() => setAvailable((available) => !available)}
            onClick={(event) => event.stopPropagation()}
            disabled={
              !quantity ||
              quantity == 0 ||
              !!errors?.[`availableQuantity_${productId}`]
            }
          />
        ) : isAvailable ? (
          <CheckCircleOutlineOutlinedIcon color="success" />
        ) : (
          <CancelOutlinedIcon color="error" />
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            if (inEditMode) {
              return submit();
            }
            setInEditMode((inEditMode) => !inEditMode);
          }}
          disabled={inEditMode && !isValid}
        >
          {inEditMode ? <DoneIcon /> : <ModeEditIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EditableProductRow;
