import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

export default function Review() {
  const { basket } = useAppSelector(state => state.basket)
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2} justifyContent='center'>
        <Grid item xs={12} sx={{ ml: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
        </Grid>
      </Grid>
      {
        basket &&
        <BasketTable items={basket.items} isBasket={false} />
      }
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>

    </>
  );
}