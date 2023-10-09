import { Container, Skeleton } from "@mui/material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function Loading() {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={3}
      >
        <Skeleton width={350} animation={false} sx={{ fontSize: "1.2rem" }} />
      </Box>
      <Grid container spacing={10}>
        <Grid xs={1}>
          <Stack direction="column" spacing={1}>
            <Skeleton
              variant="rounded"
              width={70}
              height={70}
              animation={false}
            />
            <Skeleton
              variant="rounded"
              width={70}
              height={70}
              animation={false}
            />
            <Skeleton
              variant="rounded"
              width={70}
              height={70}
              animation={false}
            />
            <Skeleton
              variant="rounded"
              width={70}
              height={70}
              animation={false}
            />
          </Stack>
        </Grid>
        <Grid xs={5}>
          <Skeleton
            variant="rounded"
            width={500}
            height={500}
            animation={false}
          />
        </Grid>
        <Grid xs={6}>
          <Card
            elevation={0}
            sx={{
              border: `1px solid #d3d3d3`,
            }}
          >
            <CardContent>
              <Skeleton width="100%" animation={false} />
              <Skeleton width="80%" animation={false} />
              <Skeleton width="20%" animation={false} />
              <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid xs={6}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="left"
                  >
                    <Skeleton animation={false} width="40%" />
                    <Skeleton animation={false} width="90%" />
                    <Skeleton animation={false} width="80%" />
                    <Skeleton animation={false} width="60%" />
                    <Skeleton animation={false} width="76%" />
                    <Skeleton animation={false} width="76%" />
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Box textAlign="left">
                    <Skeleton animation={false} width="20%" />
                    <>
                      <Skeleton animation={false} width="40%" />
                      <Skeleton animation={false} width="50%" />
                      <Skeleton animation={false} width="40%" />
                    </>
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Stack spacing={1} direction="row">
                    <Skeleton
                      animation={false}
                      width={60}
                      height={35}
                      variant="rounded"
                    />
                    <Skeleton
                      animation={false}
                      width={60}
                      height={35}
                      variant="rounded"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
