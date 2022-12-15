import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "../../base/TextField";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoneIcon from "@mui/icons-material/Done";

import { ProductData } from "../dashboard/Product";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { commonActions } from "../../ducks/actions/common";
import { SnackbarData } from "../layout/Snackbar";
import Switch from "@mui/material/Switch";
import { fetchProducts } from "../../ducks/actions/products";
import { AppDispatch } from "../../ducks";

type Inputs = {
  [key: string]: string | number | boolean | null;
};

interface EditableProductRowProps {
  product: ProductData;
  labelId: string;
  isItemSelected: boolean;
  selected: readonly string[];
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
}

const EditableProductRow: React.FC<EditableProductRowProps> = (props) => {
  const {
    product,
    product: { productId, productName, availableQuantity, price, isAvailable },
    labelId,
    isItemSelected,
    selected,
    setSelected,
  } = props;
  const dispatch: AppDispatch = useDispatch();
  const [inEditMode, setInEditMode] = React.useState(false);
  const [available, setAvailable] = React.useState(isAvailable);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      [`productName_${productId}`]: productName,
      [`availableQuantity_${productId}`]: availableQuantity,
      [`price_${productId}`]: price,
    },
  });
  const quantity = getValues(`availableQuantity_${productId}`);

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
      dispatch(commonActions.toggleLoaderState());
      return fetch("http://localhost:8080/api/v1/products", {
        body: JSON.stringify(payload),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const snackbarData: SnackbarData = {
            message: "Product updated",
            severity: "success",
          };
          if (!response.ok) {
            snackbarData.message = "Product update failed. Please try again.";
            snackbarData.severity = "error";
          } else {
            setInEditMode(false);
          }
          dispatch(commonActions.toggleLoaderState());
          dispatch(commonActions.showSnackbar(snackbarData));
          dispatch(fetchProducts());
        })
        .catch((err) => console.log(err));
    })();
  };

  React.useEffect(() => {
    if (quantity == 0) {
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
            disabled={!quantity || quantity == 0}
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
