import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard/ProductCard";
import fromApi from "@/lib/api/utils";
import { Product, prods } from "@/lib/api/product";
import { Container } from "@mui/material";
import { Result } from "@/lib/api/http";

export const metadata: Metadata = {
  title: "YoungTech - Home",
  description: "A minimalist E-commerce",
};

export default async function HomePage() {
  const prodsRs: Result<Product[]> = await prods();
  if (prodsRs.error) {
    console.log("got an error budy");
  }
  const products: Product[] = prodsRs.value!;
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {products.map((p) => {
            return (
              <Grid key={p.id} xs={6} sm={6} md={4} lg={3} xl={2}>
                <ProductCard product={p} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
