import { Person, personInfo } from "@/lib/api/person";
import { getSafeServerSession } from "@/lib/auth/security";

export default async function AccountPage() {
  const session = await getSafeServerSession();

  const person: Person | null = await personInfo(
    session?.user.id as string,
    session?.user.accessToken as string
  );

  let access_token = "";
  if (session) {
    access_token = session.user.accessToken;
    return (
      <>
        <p>My secret access_token ::: {access_token}</p>
      </>
    );
  }

  return (
    <>
      <p>Some secret data</p>
    </>
  );
}
