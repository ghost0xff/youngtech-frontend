import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
  return <p>{params.slug}</p>;
}
