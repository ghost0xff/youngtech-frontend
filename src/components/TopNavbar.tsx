"use client";

import AppBar from "@mui/material/AppBar";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";

export default function TopNavbar() {
  const products: string[] = ["a", "b", "c"];
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        {/* <Autocomplete
          freeSolo
          size="small"
          autoComplete
          openOnFocus
          options={products}
          renderInput={(params) => {
            return <TextField {...params} label="Search products" />;
          }}
        /> */}
      </Toolbar>
    </AppBar>
  );
}
