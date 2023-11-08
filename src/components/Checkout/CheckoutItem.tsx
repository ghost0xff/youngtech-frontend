"use client";

import {
  Box,
  CardActionArea,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import TextWithEllipsis from "../helpers/TextWithEllipsis";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import fromApi from "@/lib/api/utils";
import Image from "next/image";
import UnstyledLink from "../helpers/UnstyledLink";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CartItem } from "@/lib/api/cart";
import { useState } from "react";
import CheckoutItemsDialog from "./CheckoutItemsDialog";

type Props = {
  item: CartItem;
};

export default function CheckoutItem({ item }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = function () {
    setOpenDialog(false);
  };

  return (
    <>
      <Grid container key={item.id}>
        <Grid xs={11} lg={10} flexDirection="row">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Box lineHeight={0}>
              <CardActionArea href={`/${item.product.name}`}>
                <Image
                  src={fromApi(`/products/${item.product.id}/images?main=true`)}
                  alt={item.product.name}
                  width={50}
                  height={50}
                />
              </CardActionArea>
            </Box>
            <Stack flexGrow={1}>
              <UnstyledLink variant="h6" href={`/${item.product.name}`}>
                <TextWithEllipsis variant="h6" color="primary" lines={1}>
                  {item.product.name}
                </TextWithEllipsis>
              </UnstyledLink>
              <Stack direction="row" justifyContent="space-between">
                <TextWithEllipsis lines={1} variant="caption">
                  Cantidad: {item.quantity}
                </TextWithEllipsis>
                {/* <TextWithEllipsis
                  lines={1}
                  variant="caption"
                  sx={{ color: "success.main" }}
                >
                  ₡{item.product.price} c/u
                </TextWithEllipsis> */}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs={1}
          lg={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title="Modificar item">
            <IconButton
              onClick={function () {
                setOpenDialog(true);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <CheckoutItemsDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        item={item}
      />
    </>
  );
}
