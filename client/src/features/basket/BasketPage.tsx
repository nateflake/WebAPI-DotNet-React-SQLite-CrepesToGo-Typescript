import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: false, name }))
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: false, name }))
  }

  if (!basket || !itemCount || itemCount <= 0) return <Typography variant='h3'>Your basket is empty.</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell><Box paddingLeft={3}>Product</Box></TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow key={item.productId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ width: 100, textAlign: 'center' }}>
                      <img src={item.pictureUrl} alt={item.name} style={{ height: 50 }} />
                    </Box>
                    <Box style={{ marginLeft: 20, width: 180 }}>{item.name}</Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton color='error'
                    loading={status.loading && status.name === 'subtract' + item.productId}
                    onClick={() => handleRemoveItem(item.productId, 1, 'subtract' + item.productId)}>
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton color='secondary'
                    loading={status.loading && status.name === 'add' + item.productId}
                    onClick={() => handleAddItem(item.productId, 'add' + item.productId)}>
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton color='error'
                    loading={status.loading && status.name === 'remove' + item.productId}
                    onClick={() => handleRemoveItem(item.productId, item.quantity, 'remove' + item.productId)}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}