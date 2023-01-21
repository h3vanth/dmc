import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { getInitial } from "../../utils";
import Avatar from "../common/Avatar";
import { useAppSelector } from "../../ducks";

const Account: React.FC = () => {
  const email = useAppSelector((state) => state.auth.email);

  return (
    <Box sx={{ mt: 5 }}>
      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Grid item>
          <Avatar sx={{ width: 50, height: 50 }} initials={getInitial(email)} />
        </Grid>
        <Grid item>
          <Typography color="white">{email}</Typography>
        </Grid>
      </Grid>
      <Button>Reset password</Button>
    </Box>
  );
};

export default Account;
