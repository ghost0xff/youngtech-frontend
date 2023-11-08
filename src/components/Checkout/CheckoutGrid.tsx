"use client";

import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CartManager,
  ShoppingCartContext,
} from "../ShoppingCart/ShoppingCartMenu";
import { CartItem } from "@/lib/api/cart";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CheckoutItems from "./CheckoutItems";
import {
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Order } from "@/lib/api/order";
import { useRouter } from "next/navigation";
import CheckoutShippingInfo from "./CheckoutShippingInfo";
import { SchoolMetadata } from "@/lib/api/school";

type Props = {
  checkoutData: Order;
  isSchoolMember: boolean;
  schoolMetadata: SchoolMetadata;
};

export type SchoolInfo = SchoolMetadata & {
  isSchoolMember: boolean;
};
export const SchoolInfoContext = createContext<SchoolInfo>({
  technicalSubjects: [],
  academicSubjects: [],
  groups: [],
  isSchoolMember: false,
  schoolId: -1,
});

export default function CheckoutGrid({
  checkoutData,
  isSchoolMember,
  schoolMetadata,
}: Props) {
  const cartManager: CartManager = useContext(ShoppingCartContext);
  const items: CartItem[] = cartManager.items();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [items]);

  return (
    <>
      {items.length > 0 ? (
        <Grid container spacing={3} justifyContent={"flex-end"}>
          <Grid xs={12} md={6} lg={4}>
            <CheckoutItems />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Información de Pago</Typography>
                <Stack spacing={1} sx={{ marginY: 1 }}>
                  {items.map((item, index) => {
                    return (
                      <Stack
                        key={item.id}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Link
                          underline="hover"
                          color="text.secondary"
                          href={`/${item.product.name}`}
                          variant="caption"
                        >
                          {item.product.name}
                          {` x${item.quantity}`}
                        </Link>
                        {item.product.discountPercentage > 0 ? (
                          <Typography
                            color="text.primary"
                            fontWeight={500}
                            variant="body2"
                            component={"div"}
                          >
                            <Typography
                              variant="caption"
                              // display={"inline-block"}
                              color="error.main"
                            >
                              {" -"}
                              {item.product.discountPercentage}
                              {"% "}
                            </Typography>
                            ₡{item.product.price * item.quantity}
                          </Typography>
                        ) : (
                          <Typography
                            color="text.primary"
                            fontWeight={500}
                            variant="body2"
                          >
                            ₡{item.product.price * item.quantity}
                          </Typography>
                        )}
                      </Stack>
                    );
                  })}
                </Stack>
                <Divider />
                <Stack
                  marginTop={1}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Stack>
                    <Typography component={"div"} variant="caption">
                      Descuento:{" "}
                      <Typography
                        display={"inline-block"}
                        variant="inherit"
                        color="error.main"
                      >
                        ₡{checkoutData.totalDiscountCurrency}
                      </Typography>
                    </Typography>
                    <Typography component={"div"} variant="caption">
                      IVA:{" "}
                      <Typography display={"inline-block"} variant="inherit">
                        {checkoutData.ivaPercentage}%
                      </Typography>
                    </Typography>
                  </Stack>
                  <Typography component={"div"} fontWeight={600}>
                    Total:{" "}
                    <Typography display={"inline-block"} color="success.main">
                      ₡{checkoutData.total}
                    </Typography>
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <SchoolInfoContext.Provider
              value={{ ...schoolMetadata, isSchoolMember }}
            >
              <CheckoutShippingInfo checkoutData={checkoutData} />
            </SchoolInfoContext.Provider>
          </Grid>
        </Grid>
      ) : (
        <Typography>u aint got shit</Typography>
      )}
    </>
  );
}
