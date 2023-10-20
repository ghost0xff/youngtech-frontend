"use client";

import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { Product } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import { MenuUtils as MU } from "../utils";
import { useContext, useRef } from "react";
import {
  CartManager,
  CartMenuDestroyerContext,
  ShoppingCartContext,
} from "./ShoppingCartMenu";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import SideBadge from "../helpers/SideBadge";

type ShoppingCartMenuItemProps = {
  product: Product;
  quantity: number;
};

export default function ShoppingCartMenuItem({
  product,
  quantity,
}: ShoppingCartMenuItemProps) {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const menuDestroyer: MU.MenuDestroyer = useContext(CartMenuDestroyerContext);
  const router = useRouter();
  const price =
    product.discountPercentage > 0
      ? product.price - (product.price / 100) * product.discountPercentage
      : product.price;
  const loading = useRef(false);
  return (
    <>
      <MenuItem
        // disableRipple
        onClick={(e) => {
          router.push(`/${product.name}`);
          menuDestroyer.destroy();
        }}
      >
        <ListItemAvatar>
          <SideBadge
            badgeContent={`${quantity}`}
            color="secondary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Avatar
              alt={product.name}
              src={fromApi(`/products/${product.id}/images?main=true`)}
              variant="square"
            />
          </SideBadge>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography noWrap variant="body2">
              {product.name}
            </Typography>
          }
          secondary={
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {`₡${price}`}{" "}
            </Typography>
          }
        />
        <LoadingButton
          onClick={async (e) => {
            e.stopPropagation();
            loading.current = true;
            await cartManager.removeItem(product.id, 1);
            loading.current = false;
          }}
          loading={loading.current}
          disableElevation
          size="small"
          sx={{
            minWidth: "40px",
            padding: 1.2,
            color: "error.main",
          }}
        >
          <RemoveShoppingCartOutlinedIcon />
        </LoadingButton>
      </MenuItem>
    </>
  );
}
