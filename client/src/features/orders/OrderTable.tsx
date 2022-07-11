import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Box, TableBody } from "@mui/material";
import { OrderItem } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";

interface Props {
  items: OrderItem[]
}

export default function OrderTable({ items }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell><Box paddingLeft={3}>Product</Box></TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
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
                {item.quantity}
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >);
}