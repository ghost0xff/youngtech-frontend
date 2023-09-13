"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";

export default function TextWithEllipsis({
  lines,
  children,
}: {
  lines?: number | string;
  children: ReactNode;
}) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
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
