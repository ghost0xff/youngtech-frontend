import Random from "@/components/Random";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <>
      <p>home page mamapinga</p>
    </>
  );
}
