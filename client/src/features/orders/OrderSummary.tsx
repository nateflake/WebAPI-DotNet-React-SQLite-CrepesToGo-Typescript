import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Grid } from "@mui/material";
import { OrderItem } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";

interface Props {
  items: OrderItem[];
}

export default function OrderSummary({ items }: Props) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const deliveryFee = subtotal > 100 * 100 ? 0 : 5 * 100;

  return (
    <Grid container>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>

        <TableContainer component={Paper} variant={'outlined'}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Delivery fee*</TableCell>
                <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid >
  );
}