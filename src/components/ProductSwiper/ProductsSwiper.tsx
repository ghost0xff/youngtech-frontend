"use client";

// Import Swiper React components
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, IconButton, NoSsr } from "@mui/material";

// Other imports
import { Product } from "@/lib/api/product";
import ProductCard from "../ProductCard/ProductCard";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";

type Props = {
  products: Product[];
};

export default function ProductsSwiper({ products }: Props) {
  return (
    <NoSsr>
      <Box sx={{ position: "relative" }}>
        <Swiper
          navigation={
            {
              // prevEl: `.custom-swiper-button-prev`,
              // nextEl: `.custom-swiper-button-next`,
            }
          }
          breakpoints={{
            300: { slidesPerView: 1, spaceBetween: 40 },
            360: { slidesPerView: 1, spaceBetween: 40 },
            400: { slidesPerView: 1, spaceBetween: 40 },
            500: { slidesPerView: 2, spaceBetween: 10 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
            1536: { slidesPerView: 4 },
          }}
          modules={[Navigation, A11y]}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </NoSsr>
  );
}
