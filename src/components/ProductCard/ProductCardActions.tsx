"use client";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { ToggleButton, Tooltip } from "@mui/material";
import { useRef } from "react";
import { useContext } from "react";
import { useSafeSession } from "../hooks";
import { AuthNeederContext, AuthnNeederr } from "../Auth/AuthProvider";
import { CartItem, addItem, cartItems } from "@/lib/api/cart";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { AlertManager, AlertManagerContext } from "../helpers/alert";
import { LoadingButton } from "@mui/lab";

type Props = {
  productId: number;
};

export default function ProductCardActions({ productId }: Props) {
  const loading = useRef(false);
  const needer: AuthnNeederr = useContext(AuthNeederContext);
  const { status } = useSafeSession();
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const prodIds: number[] = cartManager.prodIds();

  const handleChange = async function () {
    loading.current = true;
    console.log(`adding ${loading.current}`);

    if (status === "unauthenticated") {
      needer.need();
      loading.current = false;
      console.log(`adding ${loading.current}`);
      return;
    }
    if (!prodIds.includes(productId)) {
      await cartManager.addItem(productId, 1);
      loading.current = false;
      console.log(`adding ${loading.current}`);
    } else {
      await cartManager.removeItem(productId, 1);
      loading.current = false;
      console.log(`adding ${loading.current}`);
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
        <LoadingButton
          onClick={() => handleChange()}
          loading={loading.current}
          disableElevation
          variant="outlined"
          color={prodIds.includes(productId) ? "secondary" : "inherit"}
          sx={{
            color: prodIds.includes(productId) ? "secondary.main" : "GrayText",
            borderColor: prodIds.includes(productId)
              ? "secondary.main"
              : "#c1bfbf",
            // c1bfbf
            minWidth: 20,
            minHeight: 45,
          }}
        >
          <ShoppingBagOutlinedIcon />
        </LoadingButton>
      </Tooltip>
    </>
  );
}
