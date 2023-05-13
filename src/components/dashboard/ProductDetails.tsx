import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import CloseIcon from "@mui/icons-material/Close";

import { formatPrice } from "../../utils";

import { ProductData } from "../../types";
import { useAppDispatch, useAppSelector } from "../../ducks";
import { categoriesActions } from "../../ducks/actions/categories";

const ProductDetails: React.FC<{
  product: ProductData | null;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ product, setOpenDrawer }) => {
  const dispatch = useAppDispatch();
  const {
    productId,
    isAvailable,
    productName,
    price,
    description,
    availableQuantity,
    imageUrl,
    categories,
  } = product ?? {};
  const allowNavigation = useAppSelector(
    (state) => state.common.allowNavigation
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Grid container item justifyContent="right" sx={{ mt: 1 }}>
        <IconButton onClick={() => setOpenDrawer(false)}>
          <CloseRoundedIcon />
        </IconButton>
      </Grid>
      {imageUrl ? (
        <img src={imageUrl} alt="product cover" style={{ width: 300 }} />
      ) : (
        <RamenDiningIcon fontSize="large" />
      )}
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
          <Chip
            label={`Price: ${formatPrice(price as number)}`}
            color="info"
            variant="outlined"
          />
        </Grid>
      </Grid>
      {categories?.length !== 0 && (
        <Grid container spacing={1} justifyContent="center" sx={{ py: 1 }}>
          {categories?.map((category) => (
            <Grid item key={category}>
              <Chip
                label={
                  <Grid container alignItems="center">
                    <Grid item>{category}</Grid>
                    {allowNavigation && (
                      <Grid item>
                        <CloseIcon
                          fontSize="small"
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch(
                              categoriesActions.removeCategory(
                                productId!,
                                category
                              )
                            )
                          }
                        />
                      </Grid>
                    )}
                  </Grid>
                }
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Typography variant="body2">
        {description || "Description is not available."}
      </Typography>
    </Box>
  );
};

export default ProductDetails;
