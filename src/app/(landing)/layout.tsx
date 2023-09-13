"use client";
import * as React from "react";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import TopAppBar from "@/components/TopAppBar/TopAppBar";
import AuthProvider from "@/components/Auth/AuthProvider";
import { Box, Toolbar } from "@mui/material";
import MobileBottomNavigation from "@/components/BottomNavigation/MobileBottomNavigation";
import NavigationLoader from "@/components/Loaders/NavigationLoader";

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
          <AuthProvider>
            <Box sx={{ display: "flex" }}>
              <NavigationLoader />
              <TopAppBar />
              <Box sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
              </Box>
            </Box>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
