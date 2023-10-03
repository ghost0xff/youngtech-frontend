"use client";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Alert, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ReactNode, useContext } from "react";
import { useSafeSession } from "../hooks";
import { AuthNeederContext, AuthnNeederr } from "../Auth/AuthProvider";
import { CartItem, addItem, cartItems } from "@/lib/api/cart";
import { Product } from "@/lib/api/product";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";

type CardAction = "add-cart";
type Props = {
  productId: number;
};

export default function ProductCardActions({ productId }: Props) {
  const needer: AuthnNeederr = useContext(AuthNeederContext);
  const { status } = useSafeSession();
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const prodIds: number[] = cartManager.prodIds();

  const handleChange = async function () {
    if (status === "unauthenticated") {
      needer.need();
      return;
    }
    if (!prodIds.includes(productId)) {
      cartManager.addItem(productId, 1);
    } else {
      cartManager.removeItem(productId, 1);
    }
  };

  return (
    <>
      <Tooltip
        title={
          prodIds.includes(productId)
            ? "Remover del carrito"
            : "Agregar al carrito"
        }
      >
        <ToggleButton
          value="add-cart"
          selected={prodIds.includes(productId)}
          onChange={handleChange}
          color="secondary"
        >
          {/* <ShoppingBagIcon /> */}
          <ShoppingBagOutlinedIcon />
        </ToggleButton>
      </Tooltip>
    </>
  );
}
