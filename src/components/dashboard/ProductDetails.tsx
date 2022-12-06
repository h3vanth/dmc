import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { ProductData } from "./Product";
import Add from "@mui/icons-material/Add";

const ProductDetails: React.FC<{ product: ProductData | null }> = ({
  product,
}) => {
  const {
    imageSource = "biryani.jpg",
    alt = "product cover",
    isAvailable,
    productName,
  } = product ?? {};
  return (
    <Box sx={{ width: 450, textAlign: "center" }}>
      <img src={imageSource} alt={alt} style={{ width: 300, marginTop: 75 }} />
      <Typography variant="h3">{productName}</Typography>
      <Chip
        label={isAvailable ? "Available" : "Not available"}
        color={isAvailable ? "success" : "error"}
        variant="outlined"
      />
    </Box>
  );
};

export default ProductDetails;
