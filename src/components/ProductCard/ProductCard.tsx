"use client";

import {
  Alert,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
} from "@mui/material";
import TextWithEllipsis from "../helpers/TextWithEllipsis";
import ProductCardActions from "./ProductCardActions";
import { Product } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <>
      <Card variant="outlined">
        <CardActionArea href={`/${product.name}`}>
          <CardMedia
            component="img"
            height={170}
            image={fromApi(`/products/${product.id}/images?main=true`)}
            alt="some keyboard"
          />
        </CardActionArea>
        <CardContent
          sx={{
            // minWidth: 200,
            // maxWidth: 300,
            py: 0,
            px: 2,
            pt: 1,
          }}
        >
          <TextWithEllipsis
            lines={1}
            color="primary"
            variant="body1"
            // component="div"
          >
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
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ₡{product.price.toFixed(2)}
          </Typography>
          <ProductCardActions productId={product.id} />
        </CardActions>
      </Card>
    </>
  );
}
