import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

import { ProductData } from "./Product";

const ProductDetails: React.FC<{ product: ProductData | null }> = ({
  product,
}) => {
  const {
    imageSource = "biryani.jpg",
    alt = "product cover",
    isAvailable,
    productName,
    price,
    description,
    availableQuantity,
  } = product ?? {};
  return (
    <Box sx={{ width: 450, textAlign: "center" }}>
      <img src={imageSource} alt={alt} style={{ width: 300, marginTop: 75 }} />
      <Typography variant="h3">{productName}</Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ py: 1 }}
      >
        <Grid item>
          <Chip
            label={
              isAvailable ? `Available (${availableQuantity})` : "Not available"
            }
            color={isAvailable ? "success" : "error"}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Chip label={`Price: ₹${price}`} color="info" variant="outlined" />
        </Grid>
      </Grid>
      <Typography variant="body2">
        {description || "No description available at the moment"}
      </Typography>
    </Box>
  );
};

export default ProductDetails;
