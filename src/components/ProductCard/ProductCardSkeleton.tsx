"use client";
import { Skeleton, Stack } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <>
      <Skeleton
        animation={false}
        variant="rounded"
        sx={{
          marginBottom: 1,
          width: {
            xs: 300,
            sm: 240,
            md: 260,
            lg: 265,
            xl: 265,
          },
          height: {
            xs: 220,
            sm: 250,
            md: 190,
            lg: 195,
            xl: 195,
          },
        }}
      />
      <Skeleton width="80%" animation={false} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Skeleton animation={false} variant="text" width="40%" height={50} />
        <Skeleton animation={false} variant="rounded" width="15%" height={40} />
      </Stack>
    </>
  );
}
