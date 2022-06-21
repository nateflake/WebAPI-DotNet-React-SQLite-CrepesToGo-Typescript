import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <>
      <Grid container
        rowSpacing={4}
        columnSpacing={4}
        direction="row"
        justifyContent="center"
        alignItems="spaceAround"
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={11} sm={3.75} md={2.75} lg={2.25} xl={1.75} >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}