import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector(state => state.catalog);
  return (
    <>
      <Grid container
        rowSpacing={4}
        columnSpacing={4}
        direction="row"
        alignItems="spaceAround"
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2} >
            {
              !productsLoaded
                ? (<ProductCardSkeleton />)
                : (<ProductCard product={product} />)
            }
          </Grid>
        ))}
      </Grid>
    </>
  )
}