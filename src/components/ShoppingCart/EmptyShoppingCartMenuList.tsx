import {
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { use, useContext } from "react";
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
            <Typography sx={{ color: "text.disabled" }} textAlign="center">
              Your cart is empty.
            </Typography>
          }
          secondary={
            // <Button variant="text">Keep Shopping</Button>
            <Link
              onClick={menuDestroyer.destroy}
              underline="always"
              color="primary.main"
              href="/"
            >
              <Typography
                textAlign="center"
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "secondary.main",
                }}
              >
                Keep Shopping
              </Typography>
            </Link>
          }
        />
      </MenuItem>
    </MenuList>
  );
}
