"use client";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { LoadingButton } from "@mui/lab";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";

const AutocompletePaper = (props: any) => {
  return <Paper elevation={2} {...props} />;
};

type Props = {
  stock: number;
  productId: number;
};

export default function ProductInfoCart({ stock, productId }: Props) {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const item: CartItem | undefined = cartManager
    .items()
    .find((item) => item.product.id === productId);
  const [quantity, setQuantity] = useState<number>(item ? item.quantity : 0);
  const loading = useRef(false);

  let options: string[] = [];
  for (let index = 0; index <= stock; index++) {
    options.push(index.toString());
  }

  async function handleClickAdd(fromAddCartButton?: true) {
    loading.current = true;
    if (quantity <= 0 && !fromAddCartButton) {
      loading.current = false;
      return;
    }
    if (fromAddCartButton && item) {
      loading.current = false;
      return;
    }

    await cartManager.addItem(productId, fromAddCartButton ? 1 : quantity);
    loading.current = false;
  }

  async function handleClickRemove() {
    loading.current = true;
    if (quantity <= 0) {
      loading.current = false;
      return;
    }
    await cartManager.removeItem(productId, quantity);
    loading.current = false;
  }

  return (
    <Box>
      <Stack
        spacing={1}
        direction="row"
        justifyContent={{ xs: "space-evenly", sm: "flex-start" }}
      >
        <Tooltip title={`Agregar ${quantity} al carrito`} placement="left">
          <LoadingButton
            loading={loading.current}
            variant="outlined"
            color="success"
            disableElevation
            onClick={() => handleClickAdd()}
          >
            <AddShoppingCartSharpIcon />
          </LoadingButton>
        </Tooltip>
        <Autocomplete
          size="small"
          disablePortal
          id="stock-quantity-options-cart"
          options={options}
          color="secondary.main"
          handleHomeEndKeys
          isOptionEqualToValue={(option, value) => option === value}
          clearOnBlur
          selectOnFocus
          disableClearable
          PaperComponent={AutocompletePaper}
          sx={{
            width: 60,
          }}
          renderInput={(params) => <TextField {...params} label="" />}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option}>
                {option}
              </li>
            );
          }}
          value={quantity.toString()}
          onChange={(event: any, newValue: string) => {
            setQuantity(parseInt(newValue));
          }}
        />
        <Tooltip title={`Remover ${quantity} al carrito`} placement="right">
          <LoadingButton
            loading={loading.current}
            variant="outlined"
            color="error"
            disableElevation
            onClick={handleClickRemove}
          >
            <RemoveShoppingCartOutlinedIcon />
          </LoadingButton>
        </Tooltip>
      </Stack>
      <Stack
        direction={{ xs: "column" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
        sx={{ mt: 2 }}
        spacing={2}
      >
        <Chip
          // sx={{ mt: 1.5 }}
          label={`En el carrito: ${item ? item.quantity : 0}`}
          variant="outlined"
          color="secondary"
          size="small"
        />
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          endIcon={<ShoppingCartCheckoutSharpIcon />}
          href="/checkout"
          size="medium"
          sx={{ borderRadius: 20 }}
          onClick={() => handleClickAdd(true)}
        >
          Comprar ahora
        </Button>
      </Stack>
    </Box>
  );
}
