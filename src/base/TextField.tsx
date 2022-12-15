import * as React from "react";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

const TextField: React.FC<TextFieldProps> = React.forwardRef((props, ref) => {
  return (
    <MuiTextField variant="standard" margin="normal" ref={ref} {...props} />
  );
});

export default TextField;
