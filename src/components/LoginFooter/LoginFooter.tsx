import { Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LoginFooterLink, { LoginFooterLinkProps } from "./LoginFooterLink";

export default function LoginFooter() {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {links.map((link) => (
          <LoginFooterLink href={link.href} label={link.label} />
        ))}
      </Grid>
    </>
  );
}

const links: LoginFooterLinkProps[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/tos" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Blog", href: "/blog" },
  { label: "Marketing", href: "/marketing" },
  { label: "Developers", href: "/developers" },
  { label: "Advertising", href: "/advertising" },
  { label: "© 2023 YoungTechCR." },
];
