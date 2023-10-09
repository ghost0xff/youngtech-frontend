"use client";

import {
  Avatar,
  Badge,
  BadgeProps,
  IconButton,
  Link,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { Product } from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import { MenuUtils as MU } from "../utils";
import { useContext, useEffect } from "react";
import { CartMenuDestroyerContext } from "./ShoppingCartMenu";
import { usePathname, useRouter } from "next/navigation";

type ShoppingCartMenuItemProps = {
  product: Product;
  quantity: number;
  onClickRemove(id: number): void;
};

const SideBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    // right: -3,
    left: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function ShoppingCartMenuItem({
  product,
  quantity,
  onClickRemove: handleClickRemove,
}: ShoppingCartMenuItemProps) {
  const menuDestroyer: MU.MenuDestroyer = useContext(CartMenuDestroyerContext);
  const router = useRouter();
  const price = product.discountPercentage > 0 ? (product.price / 100 * product.discountPercentage) : product.price;
  return (
    <>
      <MenuItem
        // disableRipple
        onClick={(e) => {
          router.push(`/${product.name}`);
          menuDestroyer.destroy();
        }}
        // sx={{
        //   ":hover": {
        //     bgcolor: "inherit",
        //   },
        // }}
      >
        <ListItemAvatar>
          <SideBadge
            badgeContent={`${quantity}`}
            color="warning"
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
              {`$${price}`}{" "}
            </Typography>
          }
        />
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            handleClickRemove(product.id);
          }}
        >
          <RemoveShoppingCartOutlinedIcon color="error" fontSize="small" />
        </IconButton>
      </MenuItem>
    </>
  );
}
