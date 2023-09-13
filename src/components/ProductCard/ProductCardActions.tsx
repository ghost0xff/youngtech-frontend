"use client";

import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type CardAction = "add-cart" | "info" | "none";

export default function ProductCardActions() {
  const [action, setAction] = useState<CardAction>("none");
  console.log(action);

  function handleChange(
    event: React.MouseEvent<HTMLElement>,
    newAction: CardAction | null
  ) {
    setAction(newAction ?? "none");
  }

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={action}
        exclusive
        onChange={handleChange}
        aria-label="card-action"
        size="small"
      >
        {/* <ToggleButton value="info">
          {action === "info" ? <InfoIcon /> : <InfoOutlinedIcon />}
        </ToggleButton> */}
        <ToggleButton value="add-cart">
          {action === "add-cart" ? (
            <ShoppingBagIcon />
          ) : (
            <ShoppingBagOutlinedIcon />
          )}
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
