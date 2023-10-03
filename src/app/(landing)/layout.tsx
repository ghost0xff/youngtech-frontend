"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import TopAppBar from "@/components/TopAppBar/TopAppBar";
import AuthProvider from "@/components/Auth/AuthProvider";
import { Box, Toolbar } from "@mui/material";
import NavigationLoader from "@/components/Loaders/NavigationLoader";
import { CartItem, addItem, cartItems, removeItem } from "@/lib/api/cart";
import {
  CartManager,
  ShoppingCartContext,
} from "@/components/ShoppingCart/ShoppingCartMenu";
import { Product } from "@/lib/api/product";

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
  const [items, setItems] = useState<CartItem[]>([]);
  const [update, setUpdate] = useState(false);
  const [productIds, setProductIds] = useState<number[]>([]);

  async function setAsyncItems() {
    const newItems: CartItem[] = await cartItems();
    const prodIds = newItems.map((item) => item.product.id);
    setItems(newItems);
    setProductIds(prodIds);
  }

  const cartManager: CartManager = {
    prodIds() {
      return productIds;
    },
    items() {
      return items;
    },
    async addItem(pid: number, quantity: number) {
      addItem(pid, quantity);
      setUpdate((current) => !current);
    },
    removeItem(pid: number, quantity: number) {
      removeItem(pid, quantity);
      setUpdate((current) => !current);
    },
  };

  useEffect(() => {
    setAsyncItems();
  }, [update]);

  return (
    <html lang="en" className={roboto.variable}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={roboto.className}>
        <ThemeRegistry>
          <AuthProvider>
            <ShoppingCartContext.Provider value={cartManager}>
              <Box sx={{ display: "flex" }}>
                <NavigationLoader />
                <TopAppBar />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                  <Toolbar />
                  {children}
                </Box>
              </Box>
            </ShoppingCartContext.Provider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
