"use client";

import { Link } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

type UnstyledLinkProps = {
  href: string;
  children: any;
  variant?: Variant;
  key?: string | number;
  onClick?(): any;
};

export default function UnstyledLink({
  href,
  onClick,
  children,
  key,
  variant,
}: UnstyledLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      variant={variant}
      underline="none"
      color="inherit"
      sx={{ p: 0 }}
      key={key}
    >
      {children}
    </Link>
  );
}
