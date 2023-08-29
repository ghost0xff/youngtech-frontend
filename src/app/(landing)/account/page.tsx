import { Person, personInfo } from "@/lib/actions/person";
import { getSafeServerSession } from "@/lib/auth/security";

export default async function AccountPage() {
  const session = await getSafeServerSession();

  const person: Person | null = await personInfo(
    session?.user.id as string,
    session?.user.accessToken as string
  );

  return (
    <>
      <p>Some secret data</p>
    </>
  );
}
