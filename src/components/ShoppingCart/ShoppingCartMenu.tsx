"use client";

import { Badge, IconButton, Menu, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { createContext } from "react";
import ShoppingCartMenuList from "./ShoppingCartMenuList";
import { mockProducts } from "@/lib/mock/products";
import { Product } from "@/lib/types";
import EmptyShoppingCartMenuList from "./EmptyShoppingCartMenuList";

export const CartMenuDestroyerContext = createContext<MenuDestroyer>({
  destroy: () => {},
});

export default function ShoppingCartMenu() {
  const [anchorEl, setAchorEl] = useState<null | HTMLElement>(null);

  // const [products, setProducts] = useState<Product[]>(mockProducts);
  const [products, setProducts] = useState<Product[]>([]);

  const numberItems = products.length;
  const empty: boolean = numberItems <= 0;
  const open = Boolean(anchorEl);
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAchorEl(event.currentTarget);
  }

  function handleClose() {
    setAchorEl(null);
  }

  const menuDestroyer: MenuDestroyer = useMemo(
    () => ({
      destroy: () => {
        handleClose();
      },
    }),
    []
  );

  return (
    <>
      <Tooltip
        title={
          // empty ? "Looking kinda empty over here :(" : "Ready to checkout?"
          empty ? "Un poco vacío por aquí :(" : "¿List@ para pagar?"
        }
      >
        <IconButton
          size="small"
          onClick={handleClick}
          // sx={{ ml: 2 }}
          aria-controls={open ? "shopping-cart-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={numberItems} color="warning">
            <ShoppingCartOutlinedIcon />
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
          {!empty ? (
            <ShoppingCartMenuList products={products} />
          ) : (
            <EmptyShoppingCartMenuList />
          )}{" "}
        </CartMenuDestroyerContext.Provider>
      </Menu>
    </>
  );
}
