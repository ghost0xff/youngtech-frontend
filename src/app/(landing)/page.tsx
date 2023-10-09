import { Metadata } from "next";
import { Product, prods } from "@/lib/api/product";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import dynamic from "next/dynamic";
import ProductCartRowSkeleton from "@/components/ProductCard/ProductCardRowSkeleton";

const DynamicCategoryRow = dynamic(
  () => import("@/components/Category/CategoryRow"),
  {
    // loading: () => <p>Loading...</p>,
    loading: () => <ProductCartRowSkeleton quantity={4} />,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "YoungTech - Home",
  description: "A minimalist E-commerce",
};

export default async function HomePage() {
  const prodsData: Product[] | null = await prods();

  let products: Product[] = [];
  if (!prodsData) {
    console.log("got an error budy");
  } else {
    products = prodsData;
    products = [
      ...products,
      ...[
        {
          id: 50,
          name: "lol",
          price: 1222,
          description: "some description",
          stock: 5,
          discountPercentage: 0,
          images: [{ id: 23, main: true }],
        },
        {
          id: 51,
          name: "lol",
          price: 1222,
          description: "some description",
          stock: 5,
          discountPercentage: 0,
          images: [{ id: 22, main: true }],
        },
        {
          id: 52,
          name: "lol",
          price: 1222,
          description: "some description",
          stock: 5,
          discountPercentage: 0,
          images: [{ id: 24, main: true }],
        },
        {
          id: 53,
          name: "lol",
          price: 1222,
          description: "some description",
          stock: 5,
          discountPercentage: 0,
          images: [{ id: 24, main: true }],
        },
        {
          id: 55,
          name: "lol",
          price: 1222,
          description: "some description",
          stock: 5,
          discountPercentage: 0,
          images: [{ id: 24, main: true }],
        },
        {
          id: 56,
          name: "lol",
          price: 1222,
          description: "some description",
          stock: 5,
          discountPercentage: 0,
          images: [{ id: 24, main: true }],
        },
      ],
    ];
  }

  return (
    <>
      <Container fixed>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 1 }}>
            <Link
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
          </Breadcrumbs>
        </Box>

        <Stack spacing={5}>
          <DynamicCategoryRow
            category={{ id: 1, name: "Laptops" }}
            products={products}
          />
          <DynamicCategoryRow
            category={{ id: 1, name: "Componentes" }}
            products={products}
          />
          <DynamicCategoryRow
            category={{ id: 1, name: "Computadoras" }}
            products={products}
          />
          <DynamicCategoryRow
            category={{ id: 1, name: "Celulares" }}
            products={products}
          />
          <DynamicCategoryRow
            category={{ id: 1, name: "Pepe" }}
            products={products}
          />
        </Stack>
      </Container>
    </>
  );
}
