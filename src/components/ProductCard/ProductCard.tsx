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

const ProductImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  transition: theme.transitions.create(["border-color", "box-shadow"]),
  // border: "unset",
  // borderRadius: theme.components.MuiCard?.styleOverrides,
  // border: `1px solid ${
  //   theme.palette.mode === "light"
  //     ?
  //     selected
  //       ? theme.palette.secondary.main
  //       : "#d3d3d3"
  //     : "#30363d"
  // }`,
  // "&:hover": {
  //   boxShadow: `0px 0px 0px 1px ${
  //     theme.palette.mode === "light"
  //       ? "rgba(3, 102, 214, 0.3)"
  //       : "rgb(12, 45, 107)"
  //   }`,
  //   border: `1px solid ${theme.palette.secondary.main}`,
  // },
}));

/*

SHOW DISCOUNT HERE!!!!!!!!!!

*/

export default function ProductCard({ product }: Props) {
  const hasDiscount = product.discountPercentage > 0;
  return (
    // <ProductImageBox>
    <Card
      variant="outlined"
      sx={{
        width: {
          // xs: 180,
          // xs: 300,
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
          // height={170}
          sx={{
            height: {
              // xs: 100,
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
    // </ProductImageBox>
  );
}
