"use client";

import { useContext, useRef } from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import TextWithEllipsis from "../helpers/TextWithEllipsis";
// import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
// import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
// import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function CheckoutItems() {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const items: CartItem[] = cartManager.items();
  const loading = useRef(false);

  return (
    <>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Stack spacing={1}>
            {items.map((item, index) => {
              const discMoney =
                (item.product.price / 100) * item.product.discountPercentage;
              const actualPrice = item.product.price - discMoney;
              return (
                <Grid container key={item.id}>
                  <Grid xs={8}>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <TextWithEllipsis lines={1} variant="caption">
                      {item.product.description}
                    </TextWithEllipsis>
                    <Typography
                      component="div"
                      color={"success.main"}
                      variant="caption"
                    >
                      Precio c/u:{" ₡"}
                      {actualPrice}
                      {discMoney > 0 && (
                        <Typography variant="caption" color="error.main">
                          {`-${item.product.discountPercentage}%`}
                        </Typography>
                      )}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>{index < items.length - 1 && <Divider />}</Grid>
                </Grid>
              );
            })}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
