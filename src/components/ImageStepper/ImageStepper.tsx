"use client";

import { Product, ProductImage } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import { Box, Stack, Typography, styled, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: ProductImage[];
  product: Product;
  mainImgId: number;
};

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
  transition: theme.transitions.create(["border-color", "box-shadow"]),
  border: `1px solid ${
    theme.palette.mode === "light"
      ? //   "#eaecef" :
        "#d3d3d3"
      : "#30363d"
  }`,
  "&:hover": {
    // boxShadow: `0px 0px 0px 1px ${
    //   theme.palette.mode === "light"
    //     ? "rgba(3, 102, 214, 0.3)"
    //     : "rgb(12, 45, 107)"
    // }`,
    borderColor:
      theme.palette.mode === "light" ? theme.palette.secondary.main : "#388bfd",
  },
  // },
}));

export default function ImageStepper({ images, product, mainImgId }: Props) {
  const [selectedId, setSelectedId] = useState(mainImgId);
  const theme = useTheme();
  return (
    <Grid container spacing={10}>
      <Grid xs={1}>
        <Stack direction="column" spacing={1}>
          {images.map((img) => (
            <Image
              onDragStart={function (e) {
                e.preventDefault();
              }}
              style={{
                border:
                  selectedId === img.id
                    ? `1px solid ${theme.palette.secondary.main}`
                    : `1px solid #d3d3d3`,
                borderRadius: "12x",
              }}
              onClick={function () {
                setSelectedId(img.id);
              }}
              src={fromApi(`/products/${product.id}/images/${img.id}`)}
              alt={product.name}
              width={60}
              height={60}
            />
          ))}
        </Stack>
      </Grid>
      <Grid>
        <StyledBox>
          <Image
            src={fromApi(`/products/${product.id}/images/${selectedId}`)}
            alt={product.name}
            width={500}
            height={500}
          />
        </StyledBox>
      </Grid>
    </Grid>
  );
}
