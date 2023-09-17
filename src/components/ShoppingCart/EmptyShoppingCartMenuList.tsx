import {
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { CartMenuDestroyerContext } from "./ShoppingCartMenu";

export default function EmptyShoppingCartMenuList() {
  const menuDestroyer = useContext(CartMenuDestroyerContext);
  return (
    <MenuList>
      <MenuItem
        disableRipple
        sx={{
          py: "0",
          ":hover": {
            bgcolor: "inherit",
          },
        }}
      >
        <ListItemText
          sx={{ p: 2 }}
          primary={
            <Typography
              component="h1"
              sx={{ color: "text.secondary" }}
              textAlign="center"
            >
              {/* Your cart is empty. */}
              Tu carrito está vacío
            </Typography>
          }
          secondary={
            <Link
              onClick={menuDestroyer.destroy}
              underline="always"
              color="primary.main"
              href="/"
            >
              <Typography
                component="span"
                textAlign="center"
                variant="body2"
                sx={{
                  display: "block",
                  fontWeight: 700,
                  color: "secondary.main",
                }}
              >
                Sigue Comprando
              </Typography>
            </Link>
          }
        />
      </MenuItem>
    </MenuList>
  );
}
