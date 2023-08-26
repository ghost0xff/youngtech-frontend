"use client";

import Image from "next/image";
import LightLogo from "./vlight.png";
import DarkLogo from "./vdark.png";
import { useTheme, Theme } from "@mui/material/styles";
import { Link, useMediaQuery } from "@mui/material";

type Props = {
  height: number;
};

export default function VerticalLogo({ height }: Props) {
  const theme: Theme = useTheme();
  return (
    <>
      <Link href="/">
        <Image
          priority
          src={theme.palette.mode === "dark" ? DarkLogo : LightLogo}
          height={height}
          alt="YoungTech Logo"
        />
      </Link>
    </>
  );
}
