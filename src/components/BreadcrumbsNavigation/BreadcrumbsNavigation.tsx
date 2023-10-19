"use client";

import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface BreadcrumbRoute {
  label: string;
  href?: string;
  icon?: ReactNode;
  current?: boolean;
}

type Props = {
  routes: BreadcrumbRoute[];
};

export default function BreadcrumbsNavigation({ routes }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom={2}
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 1 }}>
        {routes.map((r) => {
          return r.current ? (
            <Typography
              key={r.label}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="secondary.main"
              component="div"
            >
              {r.icon}
              <Typography sx={{ ml: 0.5 }}>{r.label}</Typography>
            </Typography>
          ) : (
            <Link
              key={r.label}
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="inherit"
              href={r.href}
            >
              {r.icon}
              <Typography sx={{ ml: 0.5 }}>{r.label}</Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
