import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Box, TableBody } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell><Box paddingLeft={3}>Product</Box></TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {
              isBasket &&
              <TableCell align="right"></TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
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
                {
                  isBasket &&
                  <LoadingButton color='error'
                    loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))}>
                    <Remove />
                  </LoadingButton>
                }
                {item.quantity}
                {
                  isBasket &&
                  <LoadingButton color='secondary'
                    loading={status === 'pendingAddItem' + item.productId}
                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}>
                    <Add />
                  </LoadingButton>
                }
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
              {
                isBasket &&
                <TableCell align="right">
                  <LoadingButton color='error'
                    loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}