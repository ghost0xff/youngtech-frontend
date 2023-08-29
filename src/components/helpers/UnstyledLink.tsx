"use client";

import { Link } from "@mui/material";

type UnstyledLinkProps = {
  href: string;
  onClick?(): any;
  children: any;
  key?: string | number;
};

export default function UnstyledLink({
  href,
  onClick,
  children,
  key,
}: UnstyledLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      underline="none"
      color="inherit"
      sx={{ p: 0 }}
      key={key}
    >
      {children}
    </Link>
  );
}
