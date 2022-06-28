import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

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
          loading={loading}
          onClick={() => handleAddItem(product.id)}
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