import { Grid, Button, Typography } from "@mui/material";
import { Order } from "../../app/models/order";
import OrderSummary from "./OrderSummary";
import OrderTable from "./OrderTable";

interface Props {
  order: Order;
  setOrderNumber: (id: number) => void;
}

export default function OrderDetail({ order, setOrderNumber }: Props) {
  const items = order.orderItems;

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Typography component="h1" variant="h5">
            Order #{order.id} - {order.orderStatus}
          </Typography>
        </Grid>

        <Grid item xs={3} mb={1} pr={1}>
          <Button fullWidth variant='contained'
            onClick={() => setOrderNumber(0)}
          >
            Back to Orders
          </Button>
        </Grid>
      </Grid>

      <OrderTable items={items} />

      <OrderSummary items={items} />
    </>
  );
}