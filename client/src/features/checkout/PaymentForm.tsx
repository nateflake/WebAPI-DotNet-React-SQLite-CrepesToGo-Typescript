import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AppTextInput from '../../app/components/AppTextInput';
import { useFormContext } from 'react-hook-form';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { StripeInput } from './StripeInput';
import { StripeElementType } from '@stripe/stripe-js';

interface Props {
  cardState: { elementError: { [key in StripeElementType]?: string } };
  onCardInputChange: (event: any) => void;
}

export default function PaymentForm({ cardState, onCardInputChange }: Props) {
  const { control } = useFormContext();

  return (
    <>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container rowSpacing={2} columnSpacing={2} justifyContent='center'>
            <Grid item xs={12} sm={7} sx={{ ml: { xs: 1, sm: 0 } }}>
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container rowSpacing={2} columnSpacing={2} justifyContent='center'>
            <Grid item xs={12} sm={7}>
              <AppTextInput name='nameOnCard' label='Name on Card' control={control} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container rowSpacing={2} columnSpacing={2} justifyContent='center'>
            <Grid item xs={12} sm={7}>
              <TextField
                onChange={onCardInputChange}
                error={!!cardState.elementError.cardNumber}
                helperText={cardState.elementError.cardNumber}
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={0} sm={12}></Grid> */}
        <Grid item xs={12}>
          <Grid container columnSpacing={2} justifyContent='center'>
            <Grid item xs={12} sm={3.5}>
              <TextField
                onChange={onCardInputChange}
                error={!!cardState.elementError.cardExpiry}
                helperText={cardState.elementError.cardExpiry}
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardExpiryElement
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3.5}>
              <TextField
                onChange={onCardInputChange}
                error={!!cardState.elementError.cardCvc}
                helperText={cardState.elementError.cardCvc}
                id="cvv"
                label="CVV"
                fullWidth
                autoComplete="cc-csc"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardCvcElement
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={12}></Grid>
      {/* </Grid> */}
    </>
  );
}