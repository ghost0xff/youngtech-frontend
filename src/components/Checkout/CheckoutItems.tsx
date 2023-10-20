"use client";

import { useContext, useRef, useState } from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
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
import CheckoutItemsDialog from "./CheckoutItemsDialog";
import { useRouter } from "next/navigation";

export default function CheckoutItems() {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const items: CartItem[] = cartManager.items();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const handleCloseDialog = function () {
    setOpenDialog(false);
  };
  const [modItemId, setModItemId] = useState<number | undefined>(undefined);

  return (
    <>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Stack spacing={1}>
            {items.map((item, index) => {
              return (
                <Grid container key={item.id}>
                  <Grid xs={10} flexDirection="row">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        // display={{ xs: "none", sm: "block" }}
                        lineHeight={0}
                      >
                        <CardActionArea href={`/${item.product.name}`}>
                          <Image
                            src={fromApi(
                              `/products/${item.product.id}/images?main=true`
                            )}
                            alt={item.product.name}
                            width={50}
                            height={50}
                          />
                        </CardActionArea>
                      </Box>
                      <Stack>
                        <UnstyledLink
                          variant="h6"
                          href={`/${item.product.name}`}
                        >
                          <TextWithEllipsis
                            variant="h6"
                            color="primary"
                            lines={1}
                          >
                            {item.product.name}
                          </TextWithEllipsis>
                        </UnstyledLink>
                        <TextWithEllipsis lines={1} variant="caption">
                          Cantidad: {item.quantity}
                        </TextWithEllipsis>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid
                    xs={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Tooltip title="Modificar item">
                      <IconButton
                        onClick={function () {
                          setModItemId(item.id);
                          setOpenDialog(true);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  {index < items.length - 1 && (
                    <Grid xs={12}>
                      <Divider sx={{ mt: 1 }} />
                    </Grid>
                  )}
                </Grid>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      {modItemId && (
        <CheckoutItemsDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          itemId={modItemId}
        />
      )}
    </>
  );
}
