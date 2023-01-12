import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";

import { useAppSelector } from "../../ducks";
import { AvatarProps } from "../../types";

const StyledBadge = styled(Badge)(({ theme, color }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: color,
    color,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const Avatar: React.FC<AvatarProps> = ({ src, alt, initials, sx }) => {
  const isOnline = useAppSelector((state) => state.common.isOnline);

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      color={isOnline ? "success" : "error"}
    >
      <MuiAvatar alt={alt} src={src} sx={sx}>
        {initials}
      </MuiAvatar>
    </StyledBadge>
  );
};

export default Avatar;
