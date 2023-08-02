"use client";

import Image from "next/image";
import LightLogo from "./hlight.png";
import DarkLogo from "./hdark.png";

export default function HorizontalLogo({ mode }: { mode: "light" | "dark" }) {
  return (
    <>
      <Image
        priority
        src={mode === "light" ? LightLogo : DarkLogo}
        // src={LightLogo}
        height={35}
        alt="YoungTech Logo"
      />
    </>
  );
}
