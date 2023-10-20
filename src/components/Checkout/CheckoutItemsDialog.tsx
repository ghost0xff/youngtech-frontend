"use client";

import { CartItem } from "@/lib/api/cart";
import {
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import Image from "next/image";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import fromApi from "@/lib/api/utils";
import TextWithEllipsis from "../helpers/TextWithEllipsis";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { useContext, useReducer, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";

type Props = {
  itemId: number;
  open: boolean;
  handleClose: () => void;
};

export default function CheckoutItemsDialog({
  itemId,
  open,
  handleClose,
}: Props) {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const loading = useRef(false);
  const item = cartManager.items().filter((i) => i.id === itemId)[0];
  const [qtyCounter, setQtyCounter] = useState(
    // cartManager.items().filter((i) => i.id === itemId)[0].quantity
    // item.product.stock
    item.quantity
  );

  const handleClickAdd = () => {
    setQtyCounter((q) => {
      const newQty = q + 1;
      if (newQty > item.product.stock) {
        return q;
      }
      return newQty;
    });
  };

  const handleClickRemove = () => {
    setQtyCounter((q) => {
      const newQty = q - 1;
      if (newQty < 0) {
        return q;
      }
      return newQty;
    });
  };

  async function handleClickRemoveEntirely() {
    console.log("u clicked me");
    loading.current = true;
    await cartManager.removeItemEntirely(item.product.id as number);
    loading.current = false;
    handleClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={"xs"}
      // transitionDuration={50}
      PaperProps={{
        // elevation: 5,
        sx: {
          // borderRadius: "12px",
          // minWidth: "305px",
          // maxWidth: "300px",
          // maxHeight: "749px",
        },
      }}
    >
      <DialogTitle>{item?.product.name}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          // color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseSharpIcon />
      </IconButton>
      <DialogContent dividers>
        <Stack direction={"row"} spacing={1} alignItems="center">
          <Image
            src={fromApi(`/products/${item?.product.id}/images?main=true`)}
            alt={item?.product.name || "image"}
            width={50}
            height={50}
          />
          <DialogContentText component={"div"}>
            <TextWithEllipsis lines={2} variant="body2">
              {item?.product.description}
            </TextWithEllipsis>
            <TextWithEllipsis
              lines={2}
              variant="body2"
              sx={{ color: "success.main" }}
            >
              Stock: {item?.product.stock}
            </TextWithEllipsis>
          </DialogContentText>
        </Stack>
        <Stack
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          direction="row"
          mt={1}
        >
          <Stack direction={{ xs: "row", sm: "row" }} spacing={1}>
            <Chip
              label={`En carrito: ${item?.quantity}`}
              variant="outlined"
              color="secondary"
              size="small"
              // clickable
            />
            {/* <Chip
              label={`Stock: ${item?.product.stock}`}
              variant="filled"
              color="warning"
              size="small"
            /> */}
          </Stack>
          {/* <ButtonGroup
            disableElevation
            aria-label="Modify quantity of items with button group"
            variant="contained"
            color="secondary"
            size="small"
          >
            <Button onClick={handleClickRemove} disabled={qtyCounter <= 0}>
              <RemoveSharpIcon />
            </Button>
            <Button>{qtyCounter}</Button>
            <Button
              onClick={handleClickAdd}
              disabled={qtyCounter >= item.product.stock}
            >
              <AddSharpIcon />
            </Button>
          </ButtonGroup> */}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: {
            xs: "space-between",
            md: "flex-end",
          },
        }}
      >
        <LoadingButton
          loading={loading.current}
          disableElevation
          variant="outlined"
          color="error"
          endIcon={<DeleteOutlineSharpIcon />}
          size="small"
          onClick={() => {
            handleClickRemoveEntirely();
          }}
        >
          Remover todo
        </LoadingButton>
        <LoadingButton
          loading={loading.current}
          disableElevation
          variant="outlined"
          color="success"
          endIcon={<SaveSharpIcon />}
          size="small"
          onClick={() => {
            console.log("u clicked me!");
          }}
        >
          Guardar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
