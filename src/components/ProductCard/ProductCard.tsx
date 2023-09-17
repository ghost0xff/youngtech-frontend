"use client";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import TextWithEllipsis from "../helpers/TextWithEllipsis";
import ProductCardActions from "./ProductCardActions";
import { Product } from "@/lib/actions/product";
import fromApi from "@/lib/api";

type Props = {
  product: Product;
};

export default async function ProductCard({ product }: Props) {
  console.log(fromApi("/products"));
  return (
    <>
      <Card variant="outlined">
        <CardActionArea href="/product">
          <CardMedia
            component="img"
            height={200}
            // image={fromApi(`/products/${product.id}/images?main=true`)}
            image="http://localhost:8080/api/v1/products/3/images/20"
            alt="some keyboard"
          />
        </CardActionArea>
        <CardContent sx={{ minWidth: 300, maxWidth: 300, padding: 1 }}>
          {product.name}
          <Typography
            variant="subtitle1"
            component="div"
            fontWeight={600}
          ></Typography>
          <TextWithEllipsis lines={1}>{product.description} </TextWithEllipsis>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "flex-start",
            alignItems: "center",
            // p: 0,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ₡{product.price.toFixed(2)}
          </Typography>
          <ProductCardActions />
        </CardActions>
      </Card>
    </>
  );
}
