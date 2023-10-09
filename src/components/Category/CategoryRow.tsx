import { Category } from "@/lib/api/category";
import { Product } from "@/lib/api/product";
import { Box, Link, Typography } from "@mui/material";
import ProductsSwiper from "../ProductSwiper/ProductsSwiper";

type Props = {
  products: Product[];
  category: Category;
};

export default function CategoryRow({ products, category }: Props) {
  return (
    <Box>
      <Link href={`/category/${category.name}`}>
        <Typography
          fontWeight={600}
          variant="subtitle1"
          color="primary.main"
          sx={{ marginBottom: 1 }}
        >
          {category.name}
        </Typography>
      </Link>
      <ProductsSwiper products={products} />
    </Box>
  );
}
