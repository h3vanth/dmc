import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RamenDiningIcon from "@mui/icons-material/RamenDining";

import { useAppDispatch, useAppSelector } from "../../ducks";
import { truncateText } from "../../utils";
import { orderActions } from "../../ducks/actions/orders";
import { ProductActionType, ProductAddlProps } from "../../types";
import { ProductAction } from "../../constants/products";

const Product: React.FC<ProductAddlProps> = ({
  productId,
  productName,
  price,
  isAvailable,
  description,
  availableQuantity,
  imageUrl,
  setOpenDrawer,
  setSelectedProduct,
}) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.orders.order);

  const onAddOrRemoveClick = (
    event: React.SyntheticEvent,
    action: ProductActionType
  ) => {
    event.stopPropagation();
    dispatch(orderActions.updateOrder({ action, productId }));
  };
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Wraps the content in a button. TODO: Find another way */}
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        onClick={() => {
          setSelectedProduct({
            productId,
            productName,
            price,
            isAvailable,
            description,
            availableQuantity,
            imageUrl,
          });
          setOpenDrawer(true);
        }}
      >
        <Grid container direction="column">
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {truncateText(productName)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              ₹{price}
            </Typography>
            <Chip
              label={
                isAvailable
                  ? `Available (${availableQuantity})`
                  : "Not available"
              }
              color={isAvailable ? "success" : "error"}
              variant="outlined"
            />
            {isAvailable && order[productId] && (
              <Chip
                label={order[productId].quantity}
                variant="filled"
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                }}
              />
            )}
          </CardContent>
          <Grid
            sx={{
              pl: 1,
              pb: 1,
            }}
          >
            <IconButton
              aria-label="add"
              disabled={
                !isAvailable ||
                order?.[productId]?.quantity === availableQuantity
              }
              onClick={(event) => onAddOrRemoveClick(event, ProductAction.ADD)}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="remove"
              disabled={
                !isAvailable ||
                !order?.[productId] ||
                order[productId].quantity === 0
              }
              onClick={(event) =>
                onAddOrRemoveClick(event, ProductAction.REMOVE)
              }
            >
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Grid>
        <CardMedia>
          {imageUrl ? (
            <img src={imageUrl} alt="product cover" width={151} />
          ) : (
            <RamenDiningIcon fontSize="large" sx={{ pr: 2 }} />
          )}
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default Product;
