"use client";

import {
  Divider,
  IconButton,
  Link,
  ListItemText,
  ListSubheader,
  MenuList,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import UnanimatedMenuItem from "../helpers/UnanimatedMenuItem";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { CartMenuDestroyerContext } from "./ShoppingCartMenu";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { Fragment, ReactNode, useContext } from "react";
import { Product } from "@/lib/types";
import ShoppingCartMenuItem from "./ShoppingCartMenuItem";
import { MenuUtils as MU } from "../utils";

type ShoppingCartMenuListProps = {
  products: Product[];
};
export default function ShoppingCartMenuList({
  products,
}: ShoppingCartMenuListProps) {
  const totalPrice: string = products
    .reduce((prev, current) => prev + current.price, 0)
    .toFixed(2);
  const theme: Theme = useTheme();
  const menuDestroyer: MU.MenuDestroyer = useContext(CartMenuDestroyerContext);

  return (
    <MenuList
      subheader={
        <ListSubheader
          color="inherit"
          disableGutters
          component="div"
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <UnanimatedMenuItem>
            <ListItemText>
              <Typography sx={{ fontWeight: 600 }} variant="h6">
                Total: ₡{totalPrice}
              </Typography>
            </ListItemText>
            <Tooltip title="Go to checkout">
              <Link href="/checkout" onClick={menuDestroyer.destroy}>
                <IconButton>
                  <ShoppingCartCheckoutOutlinedIcon
                    // color="inherit"
                    fontSize="medium"
                  />
                </IconButton>
              </Link>
            </Tooltip>
          </UnanimatedMenuItem>
        </ListSubheader>
      }
    >
      {products.map((product, index) => (
        <span key={product.id}>
          <ShoppingCartMenuItem product={product} />
          {index < products.length - 1 && <Divider />}
        </span>
      ))}
    </MenuList>
  );
}
