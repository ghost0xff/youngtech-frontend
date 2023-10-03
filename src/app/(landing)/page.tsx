import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard/ProductCard";
import fromApi from "@/lib/api/utils";
import { Product } from "@/lib/api/product";
import { Container } from "@mui/material";

export const metadata: Metadata = {
  title: "YoungTech - Home",
  description: "A minimalist E-commerce",
};

export default async function HomePage() {
  // TODO: CHANGE CACHING HERE!!!!
  const rs: Response = await fetch(fromApi("/products"), { cache: "no-store" });
  // const rs: Response = await fetch(fromApi("/products"), {
  //   next: { revalidate: 120 },
  // });

  if (!rs.ok) {
    console.error("Could not fetch initial products on home page");
  }
  const products: Product[] = await rs.json();

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
