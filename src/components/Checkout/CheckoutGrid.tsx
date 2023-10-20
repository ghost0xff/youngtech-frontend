"use client";

import { Fragment, useContext } from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CheckoutItems from "./CheckoutItems";
import {
  Card,
  CardContent,
  Divider,
  Link,
  ListItemSecondaryAction,
  Stack,
  Typography,
} from "@mui/material";

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
                <Typography variant="h6">Información de Pago</Typography>
                <Stack spacing={1} sx={{ marginY: 1 }}>
                  {items.map((item, index) => {
                    return (
                      <Stack
                        key={item.id}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Link
                          underline="hover"
                          color="text.secondary"
                          href={`/${item.product.name}`}
                          variant="caption"
                        >
                          {item.product.name}
                          {` x${item.quantity}`}
                        </Link>
                        {item.product.discountPercentage > 0 ? (
                          <Typography
                            color="text.primary"
                            fontWeight={500}
                            variant="body2"
                            component={"div"}
                          >
                            <Typography
                              variant="caption"
                              // display={"inline-block"}
                              color="error.main"
                            >
                              {" -"}
                              {item.product.discountPercentage}
                              {"% "}
                            </Typography>
                            ₡{item.product.price * item.quantity}
                          </Typography>
                        ) : (
                          <Typography
                            color="text.primary"
                            fontWeight={500}
                            variant="body2"
                          >
                            ₡{item.product.price * item.quantity}
                          </Typography>
                        )}
                      </Stack>
                    );
                  })}
                </Stack>
                <Divider />
                <Stack marginTop={1}>
                  <Typography>Subtotal: {"000"}</Typography>
                  <Typography>Total: 19999</Typography>
                </Stack>
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
