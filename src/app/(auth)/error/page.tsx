import HorizontalLogo from "@/components/Logo/HorizontalLogo";
import VerticalLogo from "@/components/Logo/VerticalLogo";
import SimpleFooter from "@/components/SimpleFooter/SimpleFooter";
import TopAppBar from "@/components/TopAppBar/TopAppBar";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function ErrorPage() {
  return (
    <>
      <TopAppBar />
      <Container>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={10}
        >
          <Grid alignItems="center" lineHeight={0}>
            <ErrorOutlineOutlinedIcon fontSize="large" color="error" />
          </Grid>
          <Grid>
            <Typography variant="h4" p={4}>
              Oops, parece que algo anda mal...
            </Typography>
          </Grid>
        </Grid>
        <SimpleFooter />
      </Container>
    </>
  );
}
