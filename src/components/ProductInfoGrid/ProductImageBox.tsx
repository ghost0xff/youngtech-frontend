"use client";

import { Box, styled } from "@mui/material";

type StyledBoxProps = {
  selected?: boolean;
};

const ProductImageBox = styled(Box)<StyledBoxProps>(({ theme, selected }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  transition: theme.transitions.create(["border-color", "box-shadow"]),
  border: `1px solid ${
    theme.palette.mode === "light"
      ? selected
        ? theme.palette.secondary.main
        : "#d3d3d3"
      : "#30363d"
  }`,
  "&:hover": {
    boxShadow: `0px 0px 0px 1px ${
      theme.palette.mode === "light"
        ? "rgba(3, 102, 214, 0.3)"
        : "rgb(12, 45, 107)"
    }`,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}));

export default ProductImageBox;
