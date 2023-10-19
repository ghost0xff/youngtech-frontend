"use client";

import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import TextWithEllipsis from "../helpers/TextWithEllipsis";
import ProductCardActions from "./ProductCardActions";
import { Product } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";

type Props = {
  product: Product;
};



export default function ProductCard({ product }: Props) {
  const hasDiscount = product.discountPercentage > 0;
  return (
    // <ProductImageBox>
    <Card
      variant="outlined"
      sx={{
        width: {
          xs: "100%",
          sm: 250,
        },
        height: {
          // xs: 210,
          xs: 280,
          sm: 280,
        },
      }}
    >
      <CardActionArea href={`/${product.name}`}>
        <CardMedia
          component="img"
          sx={{
            height: {
              xs: 170,
              sm: 170,
              md: 170,
            },
          }}
          width={100}
          image={fromApi(`/products/${product.id}/images?main=true`)}
          alt={product.name}
        />
      </CardActionArea>
      <CardContent
        sx={{
          py: 0,
          px: 2,
          pt: 1,
        }}
      >
        <TextWithEllipsis lines={1} color="primary" variant="body1">
          {product.name}
        </TextWithEllipsis>
        <TextWithEllipsis lines={1} color="secondary" variant="body2">
          {product.description}
        </TextWithEllipsis>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          alignSelf: "stretch",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          ₡
          {hasDiscount
            ? product.price - (product.price / 100) * product.discountPercentage
            : product.price}{" "}
          {hasDiscount && (
            <Typography
              variant="caption"
              color="error.main"
              sx={{
                textDecoration: "line-through",
                display: "inline-block",
              }}
            >
              ₡{product.price.toFixed(0)}
            </Typography>
          )}
        </Typography>
        <ProductCardActions productId={product.id} />
      </CardActions>
    </Card>
  );
}
