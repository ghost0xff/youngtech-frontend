"use client";

import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";

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
  const [quantity, setQuantity] = useState(item ? item.quantity : 0);
  let options: string[] = [];
  for (let index = 1; index <= stock; index++) {
    options.push(index.toString());
  }

  function handleClick() {
    if (quantity <= 0) {
      return;
    }
    cartManager.addItem(productId, quantity);
  }

  return (
    <Stack spacing={1} direction="row">
      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
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
          // borderRadius: 101,
        }}
        renderInput={(params) => <TextField {...params} label="" />}
        value={quantity.toString()}
        onChange={(event: any, newValue: string) => {
          setQuantity(parseInt(newValue));
        }}
      />
      <Tooltip title={`Agregar ${quantity} al carrito`} placement="right">
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={handleClick}
        >
          <AddShoppingCartSharpIcon />
        </Button>
      </Tooltip>
    </Stack>
  );
}
