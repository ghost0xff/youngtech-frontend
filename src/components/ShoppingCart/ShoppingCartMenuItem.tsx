"use client";

import { Product } from "@/lib/types";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

type ShoppingCartMenuItemProps = {
  product: Product;
};

export default function ShoppingCartMenuItem({
  product,
}: ShoppingCartMenuItemProps) {
  return (
    <MenuItem>
      <ListItemAvatar>
        <Avatar alt={product.name} src="/keyboard.webp" variant="square" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography noWrap variant="body2" sx={{ color: "text.disabled" }}>
            {product.name}
          </Typography>
        }
        secondary={
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {`₡${product.price}`}
          </Typography>
        }
      />
      <IconButton>
        <RemoveShoppingCartOutlinedIcon color="error" fontSize="small" />
      </IconButton>
    </MenuItem>
  );
}
