"use client";

import { Badge, IconButton, Menu, Tooltip } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { createContext } from "react";
import ShoppingCartMenuList from "./ShoppingCartMenuList";
import EmptyShoppingCartMenuList from "./EmptyShoppingCartMenuList";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { MenuUtils as MU } from "../utils";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { CartItem } from "@/lib/api/cart";

export interface ItemsSetter {
  set(items: CartItem[]): void;
}

export interface CartManager {
  prodIds(): number[];
  items(): CartItem[];
  addItem(prodId: number, quantity: number): void;
  removeItem(prodId: number, quantity: number): void;
}
export const ShoppingCartContext = createContext<CartManager>({
  prodIds() {
    return [];
  },
  items() {
    return [];
  },
  addItem(pid: number, quantity: number) {},
  removeItem(pid: number, quantity: number) {},
});

export const CartMenuDestroyerContext = createContext<MU.MenuDestroyer>({
  destroy: () => {},
});

export default function ShoppingCartMenu() {
  const [anchorEl, setAchorEl] = useState<null | HTMLElement>(null);
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const items: CartItem[] = cartManager.items();

  const numberItems: number = items.reduce(
    (prev, current) => prev + current.quantity,
    0
  );

  const empty: boolean = numberItems <= 0;
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAchorEl(event.currentTarget);
  }

  const handleClose = function () {
    setAchorEl(null);
  };

  const menuDestroyer: MU.MenuDestroyer = useMemo(
    () => ({
      destroy: () => {
        handleClose();
      },
    }),
    []
  );

  const handleClickRemove = function (id: number) {
    cartManager.removeItem(id, 1);
  };

  return (
    <>
      <Tooltip
        title={
          // empty ? "Looking kinda empty over here :(" : "Ready to checkout?"
          empty ? "Un poco vacío por aquí :(" : "¿List@ para pagar?"
        }
      >
        <IconButton
          size="large"
          onClick={handleClick}
          aria-controls={open ? "shopping-cart-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge
            badgeContent={numberItems}
            color="secondary"
            variant="standard"
          >
            {open ? (
              <ShoppingCartSharpIcon color="primary" />
            ) : (
              <ShoppingCartOutlinedIcon color="primary" />
            )}
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transitionDuration={0}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              minWidth: "300px",
              maxWidth: "300px",
              maxHeight: "400px",
            },
          },
        }}
      >
        <CartMenuDestroyerContext.Provider value={menuDestroyer}>
          {empty ? (
            <EmptyShoppingCartMenuList />
          ) : (
            <ShoppingCartMenuList
              items={items}
              onClickRemove={handleClickRemove}
            />
          )}{" "}
        </CartMenuDestroyerContext.Provider>
      </Menu>
    </>
  );
}
