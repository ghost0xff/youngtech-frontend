"use client";

import { useContext } from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CheckoutItems from "./CheckoutItems";
import { Typography } from "@mui/material";

export default function CheckoutGrid() {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const items: CartItem[] = cartManager.items();
  return (
    <>
      {items.length > 0 ? (
        <Grid container spacing={2}>
          <Grid xs={12} lg={6}>
            <CheckoutItems />
          </Grid>
          <Grid xs={12} lg={6}>
            <Typography>paying info</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>u aint got shit</Typography>
      )}
    </>
  );
}
