"use client";

import { useContext } from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CheckoutItems from "./CheckoutItems";
import { Card, CardContent, Typography } from "@mui/material";

export default function CheckoutGrid() {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const items: CartItem[] = cartManager.items();
  return (
    <>
      {items.length > 0 ? (
        <Grid container spacing={3}>
          <Grid xs={12} lg={4}>
            <CheckoutItems />
          </Grid>
          <Grid xs={12} lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography>paying info</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography>Shipping Info</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography>u aint got shit</Typography>
      )}
    </>
  );
}
