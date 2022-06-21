import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
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
          ${product.price.toFixed(2)}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.primary">
          {product.type} by: {product.brand}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>

  )
}