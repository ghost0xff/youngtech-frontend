"use client";

import { InputBase, styled } from "@mui/material";

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  "& input": {
    borderRadius: "40px 0 0 40px",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
    padding: 8.5,
    paddingLeft: "20px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid ${
      theme.palette.mode === "light"
        ? //   "#eaecef" :
          "#d3d3d3"
        : "#30363d"
    }`,
    fontSize: 16,
    "&:focus": {
      // boxShadow: `0px 0px 0px 1px ${
      //   theme.palette.mode === "light"
      //     ? "rgba(3, 102, 214, 0.3)"
      //     : "rgb(12, 45, 107)"
      // }`,
      borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
    },
  },
}));

export default StyledInput;
