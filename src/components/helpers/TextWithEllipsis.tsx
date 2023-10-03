"use client";

import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { ReactNode } from "react";

export default function TextWithEllipsis({
  lines,
  variant,
  color,
  // component,
  children,
}: {
  lines?: number | string;
  variant: Variant;
  color?: "primary" | "secondary";
  // component?: React.ElementType;
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
        }}
        fontSize={12}
      >
        {children}
      </Typography>
    </>
  );
}
