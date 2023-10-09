"use client";

import { Product, ProductImage } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Chip,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import { useState } from "react";
import { Brand } from "@/lib/api/brand";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ProductImageBox from "./ProductImageBox";
import ProductInfoCart from "./ProductInfoCart";

type Props = {
  images: ProductImage[];
  product: Product;
  brand: Brand;
  mainImgId: number;
};

export default function ProductInfoGrid({
  images,
  product,
  brand,
  mainImgId,
}: Props) {
  const [selectedId, setSelectedId] = useState(mainImgId);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={3}
      >
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
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={`/brand/${brand.name}`}
          >
            <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {brand.name}
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="#"
          >
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="secondary.main"
            >
              {product.name}
            </Typography>
          </Link>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={10}>
        <Grid xs={1}>
          <Stack direction="column" spacing={1}>
            {images.map((img) => (
              <ProductImageBox
                key={img.id}
                height={{ xs: 70 }}
                width={{ xs: 70 }}
                selected={selectedId === img.id}
              >
                <Image
                  onDragStart={function (e) {
                    e.preventDefault();
                  }}
                  onClick={function () {
                    setSelectedId(img.id);
                  }}
                  src={fromApi(`/products/${product.id}/images/${img.id}`)}
                  alt={product.name}
                  layout="fill"
                />
              </ProductImageBox>
            ))}
          </Stack>
        </Grid>
        <Grid xs={5}>
          <ProductImageBox height={{ xs: 500 }} width={{ xs: 500 }}>
            <Image
              src={fromApi(`/products/${product.id}/images/${selectedId}`)}
              alt={product.name}
              layout="fill"
            />
          </ProductImageBox>
        </Grid>
        <Grid xs={6}>
          <Card
            elevation={0}
            sx={{
              border: `1px solid #d3d3d3`,
            }}
          >
            <CardContent>
              <Typography variant="h4">{product.name}</Typography>
              <Tooltip
                title={`Más productos ${brand.name}`}
                placement="right"
                sx={{ marginY: 1 }}
              >
                <Chip
                  component={Link}
                  href={`/brand/${brand.name}`}
                  label={brand.name}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  clickable
                />
              </Tooltip>
              <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid xs={6}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="left"
                  >
                    {product.description}
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Box textAlign="left">
                    <Typography
                      color={product.stock < 10 ? "error.main" : "success.main"}
                    >
                      Stock: {product.stock}
                    </Typography>
                    {product.discountPercentage > 0 ? (
                      <>
                        <Typography variant="h5" fontWeight={500}>
                          ₡
                          {product.price -
                            (product.price / 100) * product.discountPercentage}
                        </Typography>

                        <Typography component="div" variant="caption">
                          Original:{" "}
                          <Typography
                            color="error.main"
                            sx={{
                              textDecoration: "line-through",
                              display: "inline-block",
                            }}
                          >
                            ₡{product.price.toFixed(0)}
                          </Typography>
                        </Typography>
                        <Typography variant="caption">
                          {"Ahorras: "}
                          <Typography
                            sx={{
                              display: "inline-block",
                            }}
                          >
                            ₡
                            {(product.price / 100) * product.discountPercentage}
                            {` (%${product.discountPercentage})`}
                          </Typography>
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="h5" fontWeight={500}>
                        ₡{product.price.toFixed(0)}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <ProductInfoCart
                    productId={product.id}
                    stock={product.stock}
                  />
                </Grid>
              </Grid>
            </CardContent>
            {/* <CardActions>
              <Typography>content</Typography>
            </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}