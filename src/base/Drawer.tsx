import * as React from "react";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Theme, useMediaQuery } from "@mui/material";

import { DrawerProps } from "../types";

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: "100%",
    },
  },
}));

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  const isMobile: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <StyledDrawer anchor={"right"} open={open} onClose={onClose}>
      <Box sx={{ minWidth: isMobile ? "unset" : 400 }} role="presentation">
        {children}
      </Box>
    </StyledDrawer>
  );
};

export default Drawer;
