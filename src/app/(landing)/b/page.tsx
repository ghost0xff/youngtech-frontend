import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import ProductCardSkeleton from "@/components/ProductCard/ProductCardSkeleton";

export default function BPage() {
  const num = 4;
  let cards = [];
  for (let index = 0; index < num; index++) {
    cards.push(
      <Grid>
        <ProductCardSkeleton />
      </Grid>
    );
  }

  return (
    <>
      <Container fixed>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={3}
        >
          <Skeleton width="10%" animation={false} sx={{ fontSize: "1.2rem" }} />
        </Box>
        <Stack spacing={5}>
          {/* here starts one row */}

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
                  fontSize: 22,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Stack>
            <Grid
              container
              spacing={2}
              overflow="hidden"
              columns={{ xs: 1 }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {cards}
            </Grid>
          </Box>

          {/* here starts one row */}
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
                  fontSize: 22,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Stack>
            <Grid
              container
              spacing={2}
              overflow="hidden"
              columns={{ xs: 1 }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {cards}
            </Grid>
          </Box>
          {/* here starts one row */}
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
                  fontSize: 22,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Stack>
            <Grid
              container
              spacing={2}
              overflow="hidden"
              columns={{ xs: 1 }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {cards}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
