"use client";

import Image from "next/image";
import LightLogo from "./hlight.png";
import DarkLogo from "./hdark.png";
import { useTheme, Theme } from "@mui/material/styles";
import { Link } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  height?: number | undefined;
};

export default function HorizontalLogo({ height }: Props) {
  const theme: Theme = useTheme();
  return (
    <>
      <Link href="/">
        <Image
          priority
          src={theme.palette.mode === "dark" ? DarkLogo : LightLogo}
          height={height || 35}
          alt="YoungTech Logo"
        />
      </Link>
    </>
  );
}
