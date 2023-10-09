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
  return (
    // <ProductImageBox>
    <Card
      variant="outlined"
      sx={{
        width: {
          xs: 180,
          sm: 250,
        },
        height: {
          xs: 210,
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
              xs: 100,
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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          ₡{product.price.toFixed(2)}
        </Typography>
        <ProductCardActions productId={product.id} />
      </CardActions>
    </Card>
    // </ProductImageBox>
  );
}
