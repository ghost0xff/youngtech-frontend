"use client";

import { Product, ProductImage } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Chip,
  Link,
  Stack,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import { useState } from "react";
import { Brand } from "@/lib/api/brand";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import CategoryIcon from "@mui/icons-material/Category";

type Props = {
  images: ProductImage[];
  product: Product;
  brand: Brand;
  mainImgId: number;
};

type StyledBoxProps = {
  selected?: boolean;
};

const StyledBox = styled(Box)<StyledBoxProps>(({ theme, selected }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  transition: theme.transitions.create(["border-color", "box-shadow"]),
  border: `1px solid ${
    theme.palette.mode === "light"
      ? selected
        ? theme.palette.secondary.main
        : "#d3d3d3"
      : "#30363d"
  }`,
  "&:hover": {
    boxShadow: `0px 0px 0px 1px ${
      theme.palette.mode === "light"
        ? "rgba(3, 102, 214, 0.3)"
        : "rgb(12, 45, 107)"
    }`,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}));

export default function ProductInfoGrid({
  images,
  product,
  brand,
  mainImgId,
}: Props) {
  const [selectedId, setSelectedId] = useState(mainImgId);
  const theme = useTheme();
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={3}
        // marginTop={1}
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
            href={`/brands/${brand.name}`}
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
              <StyledBox
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
              </StyledBox>
            ))}
          </Stack>
        </Grid>
        <Grid xs={5}>
          <StyledBox height={{ xs: 500 }} width={{ xs: 500 }}>
            <Image
              src={fromApi(`/products/${product.id}/images/${selectedId}`)}
              alt={product.name}
              layout="fill"
            />
          </StyledBox>
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
                  href={`/brands/${brand.name}`}
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
                  <Typography
                    color={product.stock < 10 ? "error.main" : "success.main"}
                  >
                    Stock: {product.stock}
                  </Typography>
                  <Typography variant="h6">
                    ₡{product.price.toFixed(0)}
                  </Typography>
                  {/* {product.discountPercentage} */}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              {/* <Button variant="contained" color="warning" disableElevation>
                Click me!
              </Button> */}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
