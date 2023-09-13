"use client";

import {
  BottomNavigationAction,
  BottomNavigation,
  Paper,
  Theme,
} from "@mui/material";
import { useState } from "react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

const MuiBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }: { theme: Theme }) => ({
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
    },
  })
);

export default function MobileBottomNavigation() {
  const pathname = usePathname();
  const [value, setValue] = useState(pathname);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: "block", sm: "none", md: "none" },
        }}
        elevation={2}
      >
        <BottomNavigation value={value} onChange={handleChange}>
          <MuiBottomNavigationAction
            value="/"
            onClick={() => router.push("/")}
            icon={<StorefrontSharpIcon />}
          />
          <MuiBottomNavigationAction
            value="/search"
            onClick={() => router.push("/search")}
            icon={<SearchOutlinedIcon />}
          />
          <MuiBottomNavigationAction
            value="/cart"
            onClick={() => router.push("/cart")}
            icon={<ShoppingCartOutlinedIcon />}
          />
          <MuiBottomNavigationAction
            onClick={() => router.push("/account")}
            value="/account"
            icon={<AccountCircleOutlinedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
