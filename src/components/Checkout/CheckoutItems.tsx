"use client";

import { Fragment, useContext } from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import { Card, CardContent, Divider, Stack } from "@mui/material";
import CheckoutItem from "./CheckoutItem";

export default function CheckoutItems() {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const items: CartItem[] = cartManager.items();
  return (
    <>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Stack spacing={1}>
            {items.map((item, index) => {
              return (
                <Fragment key={item.id}>
                  <CheckoutItem item={item} />
                  {index < items.length - 1 && <Divider />}
                </Fragment>
              );
            })}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
