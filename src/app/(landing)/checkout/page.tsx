import { CartItem, cartItems } from "@/lib/api/cart";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import { Container, Typography } from "@mui/material";
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation/BreadcrumbsNavigation";
import { Metadata } from "next";
import CheckoutGrid from "@/components/Checkout/CheckoutGrid";
import { Order, checkOutInfo } from "@/lib/api/order";
import { UserInfo, userInfo } from "@/lib/api/user";
import Link from "next/link";
import { SchoolMetadata, schoolMetadata } from "@/lib/api/school";

export const metadata: Metadata = {
  title: "YoungTech - Checkout",
  description: "Ready to make an order?",
};

export default async function CheckoutPage() {
  const itemsRs: Promise<CartItem[] | null> = cartItems();
  const checkoutInfoRs: Promise<Order | null> = checkOutInfo();
  const userInfoRs: Promise<UserInfo | null> = userInfo();

  const [items, checkoutData, userInfoData] = await Promise.all([
    itemsRs,
    checkoutInfoRs,
    userInfoRs,
  ]);

  if (!items || !userInfoData) {
    throw Error();
  }
  const schoolInfoRs: SchoolMetadata | null = await schoolMetadata(
    userInfoData.school_id
  );
  if (!schoolInfoRs) {
    throw Error();
  }

  console.log(schoolInfoRs.groups);

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
        {checkoutData ? (
          <CheckoutGrid
            isSchoolMember={userInfoData.is_school_member}
            checkoutData={checkoutData}
            schoolMetadata={schoolInfoRs}
          />
        ) : (
          <Typography>no items</Typography>
        )}
      </Container>
    </>
  );
}
