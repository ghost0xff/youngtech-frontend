"use client";

import { Box, Skeleton, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {
  quantity: number;
};

export default function ProductCartRowSkeleton({ quantity }: Props) {
  const elems = [];
  for (let index = 0; index < quantity; index++) {
    elems.push(
      <Grid2 sx={index === 3 ? { display: { md: "none", lg: "block" } } : {}}>
        <ProductCardSkeleton />
      </Grid2>
    );
  }
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        <Skeleton
          animation={false}
          width="15%"
          sx={{
            marginY: 1,
            fontSize: 30,
            display: { xs: "none", sm: "block" },
            marginBottom: 1,
          }}
        />
      </Stack>
      <Grid2
        container
        spacing={2}
        overflow="hidden"
        columns={{ xs: 1 }}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        {elems}
      </Grid2>
    </Box>
  );
}
