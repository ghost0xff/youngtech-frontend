import ContinueGoogleButton from "@/components/Login/ContinueGoogleButton";
import SignUpAgreementLink from "@/components/Login/SignUpAgreementLink";
import SimpleFooter from "@/components/SimpleFooter/SimpleFooter";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function LoginPage() {
  return (
    <>
      <Container>
        <Grid
          container
          spacing={2}
          direction="row-reverse"
          alignItems="center"
          justifyContent="center"
          sx={{
            // minHeight: "80vh",
            // minHeight: "97vh",
            minHeight: "91vh",
          }}
          // columns={{
          //   xs: 1,
          //   md: 2,
          // }}
        >
          <Grid
            //  xs={12}
            md={6}
          >
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                minHeight: "100%",
              }}
            >
              <CardHeader />
              <Divider />
              <CardContent>
                <Stack spacing={1} mb={2}>
                  <ContinueGoogleButton />
                </Stack>
                <Typography variant="caption" color="text.disabled">
                  Al registrarse, acepta los
                  <SignUpAgreementLink
                    text="Términos de servicio"
                    href="/tos"
                  />{" "}
                  y la{" "}
                  <SignUpAgreementLink
                    text="Política de privacidad"
                    href="/privacy-policy"
                  />
                  , incluido el{" "}
                  <SignUpAgreementLink
                    text="Uso de Cookies."
                    href="/cookie-policy"
                  />
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        </Grid>
        <SimpleFooter />
      </Container>
    </>
  );
}
