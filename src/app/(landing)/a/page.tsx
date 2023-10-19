import { Breadcrumbs, Container, Link, Skeleton } from "@mui/material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";

export default function APage() {
  return (
    <Container fixed>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={3}
      >
        <Skeleton
          animation={false}
          sx={{ fontSize: "1.2rem", width: { xs: "60%", sm: "40%" } }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid xs={12} md={1}>
          <Stack
            direction={{ xs: "row", md: "column" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="center"
            spacing={1}
          >
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
        <Grid
          xs={12}
          sm={6}
          md={6}
          lg={5}
          // sx={{
          //   display: {
          //     sx: "flex",
          //   },
          //   alignItems: {
          //     sx: "center",
          //   },
          //   justifyContent: {
          //     sx: "center",
          //   },
          // }}
          alignItems={{ sx: "center" }}
          justifyContent="center"
          display="flex"
        >
          <Skeleton
            variant="rounded"
            animation={false}
            sx={{
              width: { xs: 300, sm: 360, md: 420, lg: 470, xl: 460 },
              height: { xs: 300, sm: 360, md: 420, lg: 470, xl: 460 },
              // height: "100%",
              // width: "100%",
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={5} lg={6}>
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
                    <Skeleton
                      animation={false}
                      width={60}
                      height={35}
                      variant="rounded"
                    />
                  </Stack>
                  <Skeleton animation={false} width="20%" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
