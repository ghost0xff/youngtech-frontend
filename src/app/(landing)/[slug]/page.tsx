import { Product, ProductImage, prodImages, prodInfo } from "@/lib/api/product";
import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@mui/material";
import { Result } from "@/lib/api/http";
import ProductInfoGrid from "@/components/ProductInfoGrid/ProductInfoGrid";
import { Brand, brandFromProduct } from "@/lib/api/brand";

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
  const prodRs: Promise<Result<Product>> = prodInfo(prodName);
  const brandRs: Promise<Result<Brand>> = brandFromProduct(prodName);
  const imagesData: Promise<ProductImage[]> = prodImages(prodName);

  // const relatedProdsData: Promise<Product[]> = relatedProds(prodName);

  const [product, brand, images] = await Promise.all([
    prodRs,
    brandRs,
    imagesData,
  ]);

  const mainImg = images.find((img) => img.main);
  // HANDLE THIS ERRORS
  if (mainImg === undefined) {
    throw Error();
  }
  if (product.error) {
    throw Error();
  }
  if (brand.error) {
    console.log(brand.error);
    throw Error();
  }
  return (
    <>
      <Container>
        <ProductInfoGrid
          brand={brand.value!}
          product={product.value!}
          images={images}
          mainImgId={mainImg.id}
        />
      </Container>
      {/* <SimpleFooter /> */}
    </>
  );
}
