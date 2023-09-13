import { getSafeServerSession } from "@/lib/auth/security";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Metadata } from "next";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import TextWithEllipsis from "@/components/helpers/TextWithEllipsis";
import ProductCardActions from "@/components/ProductCard/ProductCardActions";

export const metadata: Metadata = {
  title: "YoungTech",
  description: "A minimalist E-commerce",
};

export default async function HomePage() {
  const session = await getSafeServerSession();

  const price = 12.3829108309123;

  return (
    <>
      <Grid container spacing={2}>
        <Grid>
          <Card variant="outlined">
            <CardActionArea href="/account">
              <CardMedia
                component="img"
                height={200}
                // width={200}
                image="/laptop.webp"
                alt="some keyboard"
              />
            </CardActionArea>
            <CardContent sx={{ minWidth: 300, maxWidth: 300, padding: 1 }}>
              <Typography variant="subtitle1" component="div" fontWeight={600}>
                Corsair K99 Keyboard
              </Typography>
              <TextWithEllipsis lines={1}>
                This is the descriptions of a product of only This is the
                descriptions of a product of only This is the descriptions of a
                product of only This is the descriptions of a product of only
                This is the descriptions of a product of only
              </TextWithEllipsis>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                alignSelf: "stretch",
                display: "flex",
                justifyContent: "space-between",
                // alignItems: "flex-start",
                alignItems: "center",
                // p: 0,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                ₡{price.toFixed(2)}
              </Typography>
              <ProductCardActions />
            </CardActions>
          </Card>
        </Grid>
        {/* final de card */}
      </Grid>
    </>
  );
}