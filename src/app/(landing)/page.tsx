import { getSafeServerSession } from "@/lib/auth/security";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSafeServerSession();

  return (
    <>
      <p>home page mamapinga</p>
    </>
  );
}
