import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { updateOrder } from "../../ducks/actions/orders";
import { AppDispatch, RootState } from "../../ducks";

export interface ProductData {
  productId: string;
  productName: string;
  price: number;
  imageSource?: string;
  alt?: string;
  isAvailable: boolean;
}

export type ProductAction = "add" | "remove";

interface ProductAddlProps extends ProductData {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductData | null>>;
}

const Product: React.FC<ProductAddlProps> = ({
  productId,
  productName,
  price,
  isAvailable,
  imageSource = "biryani.jpg",
  alt = "product cover",
  setOpenDrawer,
  setSelectedProduct,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const order: any = useSelector((state: RootState) => state.orders?.order);

  const onAddOrRemoveClick = (
    e: React.SyntheticEvent,
    action: ProductAction
  ) => {
    e.stopPropagation();
    dispatch(updateOrder({ action, productId }));
  };
  return (
    <Card>
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
            imageSource,
            alt,
          });
          setOpenDrawer(true);
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {productName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              ${price}
            </Typography>
            <Chip
              label={isAvailable ? "Available" : "Not available"}
              color={isAvailable ? "success" : "error"}
              variant="outlined"
            />
            {isAvailable &&
              order?.[productId] &&
              order[productId].quantity !== 0 && (
                <Chip
                  label={order[productId].quantity}
                  color="success"
                  variant="filled"
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                />
              )}
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
          >
            <IconButton
              aria-label="add"
              disabled={!isAvailable}
              onClick={(e) => onAddOrRemoveClick(e, "add")}
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
              onClick={(e) => onAddOrRemoveClick(e, "remove")}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={imageSource}
          alt={alt}
        />
      </CardActionArea>
    </Card>
  );
};

export default Product;
