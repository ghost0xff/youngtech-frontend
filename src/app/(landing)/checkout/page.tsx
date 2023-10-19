import { CartItem, cartItems } from "@/lib/api/cart";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import { Card, Container, Stack, Typography } from "@mui/material";
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation/BreadcrumbsNavigation";
import { Metadata, ResolvingMetadata } from "next";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CheckoutItems from "@/components/Checkout/CheckoutItems";
import CheckoutGrid from "@/components/Checkout/CheckoutGrid";

export const metadata: Metadata = {
  title: "YoungTech - Checkout",
  description: "Ready to make an order?",
};

export default async function CheckoutPage() {
  const itemsRs: Promise<CartItem[] | null> = cartItems();

  const [items] = await Promise.all([itemsRs]);
  if (!items) {
    throw Error();
  }

  return (
    <>
      <Container fixed>
        <BreadcrumbsNavigation
          routes={[
            {
              href: "/",
              icon: <HomeIcon fontSize="inherit" />,
              label: "Home",
            },
            {
              icon: <ShoppingCartCheckoutSharpIcon fontSize="inherit" />,
              label: "Checkout",
              current: true,
            },
          ]}
        />
        <CheckoutGrid />
      </Container>
    </>
  );
}
