import { getSafeServerSession } from "@/lib/auth/security";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Metadata } from "next";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import TextWithEllipsis from "@/components/helpers/TextWithEllipsis";
import ProductCardActions from "@/components/ProductCard/ProductCardActions";
import ProductCard from "@/components/ProductCard/ProductCard";
import fromApi from "@/lib/api";
import { Product } from "@/lib/actions/product";

export const metadata: Metadata = {
  title: "YoungTech",
  description: "A minimalist E-commerce",
};

export default async function HomePage() {
  // TODO: CHANGE CACHING HERE!!!!
  const rs: Response = await fetch(fromApi("/products"), { cache: "no-store" });

  if (!rs.ok) {
    console.error("Could not fetch initial products on home page");
  }
  const products: Product[] = await rs.json();
  console.log(products);

  return (
    <>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}


