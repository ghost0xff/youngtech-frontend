import { Product, ProductImage, prodImages, prodInfo } from "@/lib/api/product";
import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@mui/material";
import ProductInfoGrid from "@/components/ProductInfoGrid/ProductInfoGrid";
import { Brand, brandFromProduct } from "@/lib/api/brand";
import dynamic from "next/dynamic";
import ProductCartRowSkeleton from "@/components/ProductCard/ProductCardRowSkeleton";

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
  const prodName = decodeURI(params.slug);
  const prodRs: Promise<Product | null> = prodInfo(prodName);
  const brandRs: Promise<Brand | null> = brandFromProduct(prodName);
  const imagesRs: Promise<ProductImage[] | null> = prodImages(prodName);

  // const relatedProdsData: Promise<Product[]> = relatedProds(prodName);

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
      <Container>
        <ProductInfoGrid
          brand={brand}
          product={product}
          images={images}
          mainImgId={mainImg.id}
        />
      </Container>
      {/* <SimpleFooter /> */}
    </>
  );
}
