"use client";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Skeleton, Stack } from "@mui/material";

export default function ProductSwiperSkeleton() {
  return (
    <Box>
      <Stack direction="row" spacing={5}>
        <Skeleton variant="rounded" width={200} height={200} />
      </Stack>
    </Box>
  );
}
