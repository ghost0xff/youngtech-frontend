"use client";

import { Product, ProductImage } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import {
  Box,
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  Chip,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/lib/api/brand";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ProductImageBox from "./ProductImageBox";
import ProductInfoCart from "./ProductInfoCart";

// Import Swiper React components
import { Navigation, A11y, Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";

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
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const slideTo = (index: number) => swiper && swiper.slideTo(index);

  useEffect(
    function () {
      slideTo(images.findIndex((i) => i.main));
    },
    [swiper]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={1}>
          <Stack
            direction={{ xs: "row", md: "column" }}
            spacing={1}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="center"
          >
            {images.map((img) => (
              <ProductImageBox
                key={img.id}
                height={{ xs: 70 }}
                width={{ xs: 70 }}
                selected={selectedId === img.id}
                // selected
                onClick={function () {
                  const s = images.findIndex((e) => e.id === img.id);
                  slideTo(s);
                  setSelectedId(img.id);
                }}
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
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </ProductImageBox>
            ))}
          </Stack>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={5}>
          <Swiper
            modules={[Navigation, A11y, Pagination, Zoom]}
            zoom
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              300: { slidesPerView: 1 },
              360: { slidesPerView: 1 },
              400: { slidesPerView: 1 },
              500: { slidesPerView: 1 },
              600: { slidesPerView: 1 },
              900: { slidesPerView: 1 },
              1200: { slidesPerView: 1 },
              1536: { slidesPerView: 1 },
            }}
            onSwiper={(swiper) => {
              setSwiper(swiper);
              slideTo(images.findIndex((i) => i.main));
            }}
            onActiveIndexChange={function (swiper: SwiperClass) {
              const matching = images.filter(
                (img, index) => index === swiper.activeIndex
              );
              setSelectedId(matching[0].id);
            }}
          >
            {images.map((img) => (
              <SwiperSlide key={img.id}>
                <ProductImageBox
                  // height={{ xs: 310, sm: 360, md: 450, lg: 470, xl: 460 }}
                  // width={{ xs: 310, sm: 360, md: 450, lg: 470, xl: 460 }}
                  height={{ xs: 310, sm: 360, md: 410, lg: 460, xl: 460 }}
                  width={{ xs: 310, sm: 360, md: 410, lg: 460, xl: 460 }}
                  alignItems={{ sx: "center" }}
                  justifyContent="center"
                  display="flex"
                  className="swiper-zoom-container"
                >
                  <Box className="swiper-zoom-container" position={"relative"}>
                    <Image
                      onDragStart={function (e) {
                        e.preventDefault();
                      }}
                      src={fromApi(`/products/${product.id}/images/${img.id}`)}
                      alt={product.name}
                      fill
                    />
                  </Box>
                </ProductImageBox>
              </SwiperSlide>
            ))}
          </Swiper>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" marginY={1} color="GrayText">
              Doble tap para hacer zoom
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={5} lg={6}>
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
                <Grid xs={12} md={6}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="left"
                  >
                    {product.description}
                  </Typography>
                </Grid>
                <Grid xs={12} md={6}>
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