"use client";

import { SxProps, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ReactNode } from "react";

export default function TextWithEllipsis({
  lines,
  variant,
  color,
  children,
  sx,
}: {
  variant: Variant;
  sx?: SxProps;
  lines?: number | string;
  color?: "primary" | "secondary";
  children: ReactNode;
}) {
  return (
    <>
      <Typography
        variant={variant}
        color={color === "primary" ? "text.primary" : "text.secondary"}
        // component={"div"}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: lines || "3",
          WebkitBoxOrient: "vertical",
          mt: 0,
          ...sx,
        }}
        fontSize={12}
      >
        {children}
      </Typography>
    </>
  );
}
