import Random from "@/components/Random";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session?.user) {
    return <p>not authed :v</p>;
  }

  return (
    <>
      <h1>This is a public page</h1>
    </>
  );
}
