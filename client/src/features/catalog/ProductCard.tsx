import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card key={product.id}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>
          {product.name.charAt(0).toUpperCase()}
        </Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' }
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
        component="img"
        image={product.pictureUrl}
        alt={product.name}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="text.secondary">
          {currencyFormat(product.price)}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.primary">
          {product.type} by: {product.brand}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes('pendingAddItem' + product.id)}
          onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
          size="small"
        >
          Add to Cart
        </LoadingButton>
        <Button size="small"
          component={Link}
          to={`/catalog/${product.id}`}
        >View</Button>
      </CardActions>
    </Card >
  )
}