import PersonInfo from "@/components/PersonInfo";
import Random from "@/components/Random";
import { Person, personInfo } from "@/lib/actions/person";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  const person: Person | null = await personInfo(
    session?.user.id as string,
    session?.user.accessToken as string
  );

  return (
    <>{person && person.firstnames.concat(" ").concat(person.lastnames)}</>
  );
}
