import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import RamenDiningIcon from "@mui/icons-material/RamenDining";

import { ProductData } from "../../types";

const ProductDetails: React.FC<{
  product: ProductData | null;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ product, setOpenDrawer }) => {
  const {
    alt = "product cover",
    isAvailable,
    productName,
    price,
    description,
    availableQuantity,
  } = product ?? {};
  return (
    <Box sx={{ textAlign: "center" }}>
      <Grid container item justifyContent="right" sx={{ mt: 1 }}>
        <IconButton onClick={() => setOpenDrawer(false)}>
          <CloseRoundedIcon />
        </IconButton>
      </Grid>
      <RamenDiningIcon fontSize="large" />
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
