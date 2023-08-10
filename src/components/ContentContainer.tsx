import { Box } from "@mui/material";
import { ReactNode } from "react";

type ContentContainerProps = {
  children: ReactNode;
};
export default function ContentContainer({ children }: ContentContainerProps) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${340}}px)` } }}
    >
      {children}
    </Box>
  );
}
