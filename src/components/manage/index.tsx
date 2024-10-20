import Grid from '@mui/material/Grid';

import ManageFoodItems from './ManageFoodItems';
import Events from './Events';

export default function Manage() {
  return (
    <Grid container mb={4}>
      <Grid item xs={12}>
        <ManageFoodItems />
      </Grid>
      <Grid item md={6} xs={12}>
        <Events />
      </Grid>
    </Grid>
  );
}
