import * as React from "react";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import TopAppBar from "@/components/TopAppBar/TopAppBar";
import ContentContainer from "@/components/ContentContainer";
import AuthProvider from "@/components/Auth/AuthProvider";
import { Typography } from "@mui/material";
import SimpleFooter from "@/components/SimpleFooter/SimpleFooter";
const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <ThemeRegistry>
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
