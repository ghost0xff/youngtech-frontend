import { Product, ProductImage, prodImages, prodInfo } from "@/lib/api/product";
import type { Metadata, ResolvingMetadata } from "next";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import ProductInfoGrid from "@/components/ProductInfoGrid/ProductInfoGrid";
import { Brand, brandFromProduct } from "@/lib/api/brand";
// import dynamic from "next/dynamic";
// import ProductCartRowSkeleton from "@/components/ProductCard/ProductCardRowSkeleton";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation/BreadcrumbsNavigation";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = decodeURI(params.slug);
  return {
    title: slug,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  
  // TODO: MAKE THIS SO THAT ONLY ONE HTTP REQUEST IS MADE
  const prodName = decodeURI(params.slug);
  const prodRs: Promise<Product | null> = prodInfo(prodName);
  const brandRs: Promise<Brand | null> = brandFromProduct(prodName);
  const imagesRs: Promise<ProductImage[] | null> = prodImages(prodName);
  const [product, brand, images] = await Promise.all([
    prodRs,
    brandRs,
    imagesRs,
  ]);

  if (!images || !product || !brand) {
    console.log("error");
    throw Error();
  }

  const mainImg = images.find((img) => img.main);
  // HANDLE THIS ERRORS
  if (mainImg === undefined) {
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
              href: `/brand/${brand.name}`,
              icon: <CategoryIcon fontSize="inherit" />,
              label: brand.name,
            },
            {
              current: true,
              label: product.name,
            },
          ]}
        />
        <ProductInfoGrid
          brand={brand}
          product={product}
          images={images}
          mainImgId={mainImg.id}
        />
      </Container>
    </>
  );
}
