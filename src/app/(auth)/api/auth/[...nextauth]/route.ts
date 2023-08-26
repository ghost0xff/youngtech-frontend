

import { authOptions } from "@/lib/auth/options";
import NextAuthOptions from "next-auth/next";

const handler = NextAuthOptions(authOptions);

export { handler as GET, handler as POST };