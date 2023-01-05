import * as React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, SubmitHandler } from "react-hook-form";

import TextField from "../../base/TextField";
import { authActions } from "../../ducks/actions/auth";
import { password, email } from "../../validations/auth";
import { RESET_OPTIONS } from "../../constants/form";
import { useAppDispatch } from "../../ducks";

type Inputs = {
  email: string;
  password: string;
  confirmpassword: string;
};

const Authenticate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isRegistration, setIsRegistration] = React.useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Inputs>({
    // Validation will trigger on the blur and change events.
    mode: "all",
  });
  const pass = watch("password");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let action = authActions.authenticate;
    if (isRegistration) {
      action = authActions.register;
    }
    dispatch(
      action(
        {
          email: data.email,
          password: data.password,
        },
        () => {
          navigate("/dmc/");
        }
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography variant="h3" color="white" sx={{ mb: 2 }}>
        {isRegistration ? "Sign up" : "Log in"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            label="User name"
            {...register("email", email)}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", password)}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {isRegistration && (
            <TextField
              label="Confirm password"
              type="password"
              {...register("confirmpassword", {
                required: password.required,
                validate: (value) => {
                  if (value && pass && value !== pass) {
                    return "Must be same as the password entered above";
                  }
                },
              })}
              error={!!errors.confirmpassword}
              helperText={errors.confirmpassword?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button type="submit" variant="contained" disabled={!isValid}>
              {isRegistration ? "Sign up" : "Log in"}
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={() => {
                reset(
                  { email: "", password: "", confirmpassword: "" },
                  RESET_OPTIONS
                );
                setIsRegistration((isRegistration) => !isRegistration);
              }}
            >
              {isRegistration ? "Log in" : "Sign up"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default Authenticate;
