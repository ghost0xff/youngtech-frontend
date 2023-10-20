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
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { useContext, useReducer, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import ShoppingCartQuantifier from "../ShoppingCart/ShoppingCartQuantifier";

type Props = {
  item: CartItem;
  open: boolean;
  handleClose: () => void;
};

export default function CheckoutItemsDialog({ item, open, handleClose }: Props) {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const loading = useRef(false);

  async function handleClickRemoveEntirely() {
    handleClose();
    loading.current = true;
    await cartManager.removeItemEntirely(item.product.id as number);
    loading.current = false;
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={"xs"}
      // scroll="body"
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
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems={{ xs: "flex-end", sm: "center" }}
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          mt={1}
        >
          <Chip
            label={`En carrito: ${item?.quantity}`}
            variant="outlined"
            color="secondary"
            size="small"
            sx={{
              width: {
                xs: "35%",
                sm: "25%",
              },
            }}
            // clickable
          />
          <ShoppingCartQuantifier
            productId={item.product.id}
            stock={item.product.stock}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: {
            xs: "flex-start",
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
      </DialogActions>
    </Dialog>
  );
}
