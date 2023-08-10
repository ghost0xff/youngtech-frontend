"use client";

import Image from "next/image";
import LightLogo from "./hlight.png";
import DarkLogo from "./hdark.png";
import { useTheme, Theme } from "@mui/material/styles";
import { Link } from "@mui/material";

export default function HorizontalLogo() {
  const theme: Theme = useTheme();
  return (
    <>
      <Link href="/">
        <Image
          priority
          src={theme.palette.mode === "dark" ? DarkLogo : LightLogo}
          height={35}
          alt="YoungTech Logo"
        />
      </Link>
    </>
  );
}
