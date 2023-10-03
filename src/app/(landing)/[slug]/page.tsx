import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Product,
  ProductImage,
  prodImages,
  prodInfo,
  relatedProds,
} from "@/lib/api/product";
import fromApi from "@/lib/api/utils";
import type { Metadata, ResolvingMetadata } from "next";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ImageStepper from "@/components/ImageStepper/ImageStepper";
import SimpleFooter from "@/components/SimpleFooter/SimpleFooter";

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

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: slug,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const prodName = await decodeURI(params.slug);
  const prodData: Promise<Product> = prodInfo(prodName);
  const imagesData: Promise<ProductImage[]> = prodImages(prodName);
  const relatedProdsData: Promise<Product[]> = relatedProds(prodName);

  const [product, images, related] = await Promise.all([
    prodData,
    imagesData,
    relatedProdsData,
  ]);
  const mainImg = images.find((img) => img.main);
  if (mainImg === undefined) {
    throw Error();
  }

  return (
    <>
      <Container>
        <Grid container>
          <Grid>
            <ImageStepper
              product={product}
              images={images}
              mainImgId={mainImg.id}
            />
          </Grid>
          <Grid xs={5}>
            <Card
              elevation={0}
              sx={{
                border: `1px solid #d3d3d3`,
              }}
            >
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h6">{product.price}</Typography>
                <Typography variant="body1">{product.description}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="warning" disableElevation>
                  Click me!
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {/* <Box>
          {related.map((prod) => {
            return <Typography>{prod.name}</Typography>;
          })}
        </Box> */}
      </Container>
      {/* <SimpleFooter /> */}
    </>
  );
}
