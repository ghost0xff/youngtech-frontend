"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import TopAppBar from "@/components/AppBar/TopAppBar";
import AuthProvider from "@/components/Auth/AuthProvider";
import { Alert, Box, Snackbar, Toolbar } from "@mui/material";
import NavigationLoader from "@/components/Loaders/NavigationLoader";
import {
  CartItem,
  addItem,
  cartItems,
  removeItem,
  removeItemCompletely,
} from "@/lib/api/cart";
import {
  CartManager,
  ShoppingCartContext,
} from "@/components/ShoppingCart/ShoppingCartMenu";
import { AlertManager, AlertManagerContext } from "@/components/helpers/alert";
import { AlertColor } from "@mui/material";
import AppFooter from "@/components/AppFooter/AppFooter";

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
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSevertity] = useState<AlertColor>("success");
  const [alertDuration, setAlertDuration] = useState(0);

  //--------------------------------------------------------------
  //
  //    TODO: SHOULD MIGRATE ALL THIS HANDLERS TO A REDUCER NOW!!!
  //
  //--------------------------------------------------------------

  async function setAsyncItems() {
    const newItems: CartItem[] | null = await cartItems();
    if (newItems) {
      const prodIds = newItems.map((item) => item.product.id);
      setItems(newItems!);
      setProductIds(prodIds);
      return;
    } else {
      // console.log("items are null");
      return;
    }
  }

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const alertManager: AlertManager = {
    show(message: string, severity: AlertColor, duration: number) {
      setAlertMessage(message);
      setAlertSevertity(severity);
      setAlertDuration(duration);
      handleOpenAlert();
    },
  };

  const cartManager: CartManager = {
    prodIds() {
      return productIds;
    },
    items() {
      return items;
    },

    async addItem(pid: number, quantity: number) {
      const item: CartItem | undefined = items.find(
        (i) => i.product.id === pid
      );
      if (item) {
        if (item.quantity + quantity > item.product.stock) {
          alertManager.show(
            "No puedes agregar más items de los disponibles",
            "error",
            3000
          );
          return;
        }
      }
      addItem(pid, quantity);
      alertManager.show(
        quantity === 1
          ? "Se ha agregado un item al carrito"
          : `Se han agregado ${quantity} items al carrito`,
        "success",
        3000
      );
      setUpdate((current) => !current);
    },

    async removeItem(pid: number, quantity: number) {
      const item: CartItem | undefined = items.find(
        (i) => i.product.id === pid
      );
      if (!item) {
        alertManager.show(
          "No puedes eliminar algo que no tienes",
          "error",
          3000
        );
        return;
      } else {
        if (quantity > item.quantity) {
          alertManager.show(
            `Solo tienes ${item.quantity} de estos en el carrito!`,
            "error",
            3000
          );
          return;
        }
      }
      try {
        await removeItem(pid, quantity);
      } catch {
        alertManager.show("Ha ocurrido un error", "error", 3000);
        return;
      }
      alertManager.show(
        quantity === 1
          ? "Se ha removido un item del carrito"
          : `Se han removido ${quantity} items del carrito`,
        "warning",
        3000
      );
      setUpdate((current) => !current);
    },

    async removeItemEntirely(prodId: number) {
      const item: CartItem | undefined = items.find(
        (i) => i.product.id === prodId
      );
      if (!item) {
        alertManager.show(
          "No puedes eliminar algo que no tienes",
          "error",
          3000
        );
        return;
      }
      try {
        await removeItemCompletely(prodId);
      } catch {
        alertManager.show("Ha ocurrido un error", "error", 3000);
        return;
      }
      alertManager.show(
        `Se han removido un item completamente del carrito`,
        "warning",
        3000
      );
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
            <AlertManagerContext.Provider value={alertManager}>
              <ShoppingCartContext.Provider value={cartManager}>
                <NavigationLoader />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    //  ^^^^ never delete this line,
                    // cost me like 4 hours of straight
                    // debugging
                    position: "relative",
                    minHeight: "100vh",
                  }}
                >
                  <TopAppBar />
                  <Box
                    sx={{
                      flexGrow: 1,
                      p: 2.5,
                    }}
                  >
                    <Toolbar sx={{ display: { xs: "flex", sm: "none" } }} />
                    <Toolbar />
                    {children}
                  </Box>
                  {/* <AppFooter /> */}
                </Box>

                <Snackbar
                  open={openAlert}
                  autoHideDuration={alertDuration}
                  onClose={handleCloseAlert}
                  anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                >
                  <Alert
                    onClose={handleCloseAlert}
                    severity={alertSeverity}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {alertMessage}
                  </Alert>
                </Snackbar>
              </ShoppingCartContext.Provider>
            </AlertManagerContext.Provider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
