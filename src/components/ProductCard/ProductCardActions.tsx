"use client";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useState } from "react";
import { ReactNode, useContext } from "react";
import { useSafeSession } from "../hooks";
import { AuthNeederContext, AuthnNeederr } from "../Auth/AuthProvider";

type CardAction = "add-cart" | "none";

export default function ProductCardActions() {
  const [action, setAction] = useState<CardAction>("none");
  const needer: AuthnNeederr = useContext(AuthNeederContext);
  const { status } = useSafeSession();

  function handleChange(
    event: React.MouseEvent<HTMLElement>,
    newAction: CardAction | null
  ) {
    if (status === "unauthenticated") {
      needer.need();
      return;
    }
    setAction(newAction ?? "none");
  }

  return (
    <>
      <Tooltip
        title={action === "none" ? "Agregar al carrito" : "Remover del carrito"}
      >
        <ToggleButtonGroup
          color="primary"
          value={action}
          exclusive
          onChange={handleChange}
          aria-label="card-action"
          size="small"
        >
          <ToggleButton value="add-cart">
            {action === "add-cart" ? (
              <ShoppingBagIcon />
            ) : (
              <ShoppingBagOutlinedIcon />
            )}
          </ToggleButton>
        </ToggleButtonGroup>
      </Tooltip>
    </>
  );
}
