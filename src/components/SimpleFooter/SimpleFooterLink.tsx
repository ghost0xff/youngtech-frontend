import { Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Variant } from "@mui/material/styles/createTypography";

export type LoginFooterLinkProps = {
  label: string;
  href?: string;
  notLink?: boolean;
};

export default function SimpleFooterLink({
  label,
  href,
  notLink,
}: LoginFooterLinkProps) {
  const sharedVariant: Variant = "caption";
  return (
    <>
      <Grid>
        {!href ? (
          <Typography
            sx={{ color: "text.disabled" }}
            textAlign="center"
            variant={sharedVariant}
          >
            {label}
          </Typography>
        ) : (
          <Link underline="hover" href={href}>
            <Typography
              sx={{ color: "text.disabled" }}
              textAlign="center"
              variant={sharedVariant}
            >
              {label}
            </Typography>
          </Link>
        )}
      </Grid>
    </>
  );
}
